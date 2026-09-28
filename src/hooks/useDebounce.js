import { useEffect, useState } from 'react';

/** Adia a atualização até que o usuário pare de digitar por delay ms. */
export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
