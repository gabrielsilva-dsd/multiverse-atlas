const API_URL = 'https://rickandmortyapi.com/api/character/';
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 8000;

/** Dá tempo para uma conexão móvel se recuperar sem repetir requisições em sequência. */
const retryDelay = (attempt) => 700 * 2 ** (attempt - 1);

/** Limita requisições que ficam pendentes em redes móveis e preserva o cancelamento da busca. */
async function fetchWithTimeout(url, signal) {
  const controller = new AbortController();
  const onAbort = () => controller.abort(signal.reason);
  if (signal?.aborted) onAbort();
  else signal?.addEventListener('abort', onAbort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
  } catch (error) {
    if (timedOut && !signal?.aborted) throw new Error('A API demorou para responder. Tente novamente.');
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

/** @typedef {{id:number,name:string,status:string,species:string,type:string,gender:string,origin:{name:string},location:{name:string},image:string,episode:string[],url:string}} Character */
/** @typedef {{info:{count:number,pages:number,next:string|null,prev:string|null},results:Character[]}} CharacterPage */

/** Pausa cancelável entre tentativas; desmontagem e troca de filtros interrompem o retry. */
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(signal.reason); return; }
    const timer = setTimeout(() => { signal?.removeEventListener('abort', onAbort); resolve(); }, ms);
    function onAbort() { clearTimeout(timer); signal.removeEventListener('abort', onAbort); reject(signal.reason); }
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/** Consulta a página selecionada; 404 é busca vazia, 429/5xx/rede recebem retry limitado. */
export async function getCharacters(filters, signal) {
  const url = new URL(API_URL);
  for (const [key, value] of Object.entries(filters)) {
    if (value !== '' && value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    if (signal?.aborted) throw signal.reason;
    let response;
    try {
      response = await fetchWithTimeout(url, signal);
    } catch (error) {
      if (signal?.aborted || error?.name === 'AbortError') throw error;
      if (attempt === MAX_ATTEMPTS) throw new Error('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
      await delay(retryDelay(attempt), signal);
      continue;
    }

    if (response.status === 404) return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    if (!response.ok) {
      if ((response.status === 429 || response.status >= 500) && attempt < MAX_ATTEMPTS) {
        await delay(retryDelay(attempt), signal);
        continue;
      }
      throw new Error(`A API está indisponível no momento (HTTP ${response.status}). Tente novamente.`);
    }

    /** @type {CharacterPage} */
    let data;
    try { data = await response.json(); }
    catch { throw new Error('A API retornou uma resposta inválida. Tente novamente.'); }
    if (!Array.isArray(data?.results) || !data.info || !Number.isFinite(data.info.pages)) {
      throw new Error('A API retornou dados inesperados. Tente novamente.');
    }
    return data;
  }
}
