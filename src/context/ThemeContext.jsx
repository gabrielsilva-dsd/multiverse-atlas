import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'multiverse-theme';

/** @returns {'light' | 'dark'} Tema salvo ou preferência do sistema. */
function initialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* Armazenamento pode estar indisponível. */ }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Compartilha o tema sem acoplar componentes ao localStorage. */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d1412' : '#f5f7ef');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Tema continua ativo na sessão. */ }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((old) => old === 'dark' ? 'light' : 'dark') }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** @returns {{theme: 'light' | 'dark', toggleTheme: () => void}} */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requer ThemeProvider');
  return context;
}
