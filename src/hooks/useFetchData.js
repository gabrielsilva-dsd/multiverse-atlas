import { useCallback, useEffect, useState } from 'react';
import { getCharacters } from '../services/characters.js';

/** Busca a página atual, cancela consultas antigas e permite refetch manual. */
export function useFetchData(filters) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [retryKey, setRetryKey] = useState(0);
  const { name, status, species, gender, page } = filters;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ data: null, loading: true, error: null });

    getCharacters({ name, status, species, gender, page }, controller.signal)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (active && !controller.signal.aborted) {
          setState({ data: null, loading: false, error: error?.message || 'Não foi possível carregar os dados.' });
        }
      });

    return () => { active = false; controller.abort(); };
  }, [name, status, species, gender, page, retryKey]);

  const retry = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    setRetryKey((key) => key + 1);
  }, []);

  return { ...state, retry };
}
