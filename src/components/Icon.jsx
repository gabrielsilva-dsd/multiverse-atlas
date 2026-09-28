/** Ícones decorativos reutilizáveis; controles recebem nome acessível no próprio botão. */
export function Icon({ name, size = 20, className = '' }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    close: <path d="M18 6 6 18M6 6l12 12"/>,
    reset: <><path d="M3 11a9 9 0 1 1 2.6 6.4M3 4v7h7"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/></>,
    spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
