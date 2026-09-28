import { useCallback, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Filters } from './components/Filters.jsx';
import { CharacterCard } from './components/CharacterCard.jsx';
import { CharacterModal } from './components/CharacterModal.jsx';
import { SkeletonGrid, Feedback } from './components/Feedback.jsx';
import { Pagination } from './components/Pagination.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import { useFetchData } from './hooks/useFetchData.js';
import styles from './App.module.css';

const initialFilters = { status: '', species: '', gender: '' };

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const resultsRef = useRef(null);
  const requestedFilters = useMemo(
    () => ({ name: query.trim(), status: filters.status, species: filters.species, gender: filters.gender, page }),
    [query, filters.status, filters.species, filters.gender, page],
  );
  // Agrupa mudanças rápidas de busca, filtros e paginação em uma consulta.
  const debouncedFilters = useDebounce(requestedFilters, 650);
  const { data, loading, error, retry } = useFetchData(debouncedFilters);
  const characters = useMemo(() => {
    const seen = new Set();
    return (data?.results ?? []).filter((character) => {
      if (seen.has(character.id)) return false;
      seen.add(character.id);
      return true;
    });
  }, [data?.results]);
  const hasFilters = Boolean(query || Object.values(filters).some(Boolean));

  const clear = () => { setQuery(''); setFilters(initialFilters); setPage(1); };
  const changeFilter = (key, value) => { setFilters((current) => ({ ...current, [key]: value })); setPage(1); };
  const changePage = (next) => {
    setPage(next);
    window.requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    });
  };
  const closeModal = useCallback(() => setSelected(null), []);
  const pendingSearch = requestedFilters !== debouncedFilters;
  const isLoading = loading || pendingSearch;

  return <>
    <Header />
    <main className="container"><Hero /><Filters query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} filters={filters} onFilterChange={changeFilter} onClear={clear} hasFilters={hasFilters}/>
      <section ref={resultsRef} tabIndex={-1} className={styles.results} aria-label="Resultados da busca" aria-busy={isLoading}>
        <div className={styles.resultsHead}><p><span className={styles.liveDot}/>{isLoading ? 'PROCURANDO SINAIS...' : error ? 'CONEXÃO INDISPONÍVEL' : `${data?.info.count ?? 0} PERSONAGENS ENCONTRADOS`}</p><span>{data && !isLoading && !error ? `EXIBINDO ${characters.length} NESTA PÁGINA` : 'DADOS DO MULTIVERSO'}</span></div>
        {isLoading ? <SkeletonGrid /> : error ? <Feedback kind="error" message={error} onAction={retry}/> : characters.length === 0 ? <Feedback kind="empty" onAction={clear}/> : <div className="grid">{characters.map((character, index) => <CharacterCard key={character.id} character={character} priority={index < 4} onOpen={setSelected}/>)}</div>}
        {!isLoading && !error && data && <Pagination page={page} pages={data.info.pages} onPageChange={changePage}/>}
      </section>
    </main>
    <footer className={styles.footer}><div className="container"><span>MULTIVERSE/ATLAS <small>© {new Date().getFullYear()}</small></span><span>Dados por <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">The Rick and Morty API ↗</a></span></div></footer>
    <CharacterModal character={selected} onClose={closeModal}/>
  </>;
}
