import { Icon } from './Icon.jsx';
import styles from './Pagination.module.css';

export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return <nav className={styles.pagination} aria-label="Paginação de personagens"><button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}><Icon name="chevron" className={styles.previous} size={17}/> Anterior</button><span>Página <strong>{page}</strong> de <strong>{pages}</strong></span><button type="button" onClick={() => onPageChange(page + 1)} disabled={page === pages}>Próxima <Icon name="chevron" size={17}/></button></nav>;
}
