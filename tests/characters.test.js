import test from 'node:test';
import assert from 'node:assert/strict';
import { getCharacters } from '../src/services/characters.js';

test('repete falha transitória e mantém a página solicitada', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls += 1;
    assert.equal(url.searchParams.get('page'), '4');
    if (calls === 1) return { ok: false, status: 503 };
    return { ok: true, status: 200, json: async () => ({ info: { count: 826, pages: 42 }, results: [{ id: 61 }] }) };
  };
  try {
    const data = await getCharacters({ page: 4 }, new AbortController().signal);
    assert.equal(calls, 2);
    assert.equal(data.results[0].id, 61);
  } finally { globalThis.fetch = originalFetch; }
});

test('404 representa uma busca sem resultados', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 404 });
  try { assert.deepEqual((await getCharacters({ name: 'inexistente' })).results, []); }
  finally { globalThis.fetch = originalFetch; }
});

test('cancelamento interrompe a espera antes da segunda tentativa', async () => {
  const originalFetch = globalThis.fetch;
  const controller = new AbortController();
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; controller.abort(); return { ok: false, status: 503 }; };
  try {
    await assert.rejects(getCharacters({ page: 3 }, controller.signal));
    assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; }
});

test('consultas repetidas reaproveitam dados e não consomem novas requisições', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, status: 200, json: async () => ({ info: { count: 1, pages: 1 }, results: [{ id: 826 }] }) };
  };
  try {
    await getCharacters({ name: 'personagem de teste' });
    await getCharacters({ name: 'personagem de teste' });
    assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; }
});

test('limite 429 não dispara novas tentativas', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; return { ok: false, status: 429 }; };
  try {
    await assert.rejects(getCharacters({ name: 'rate-limit-teste' }), /Muitas consultas/);
    assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; }
});
