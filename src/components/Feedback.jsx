import { Icon } from './Icon.jsx';
import styles from './Feedback.module.css';

export function SkeletonGrid() {
  return <div className="grid" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <div key={index} className={styles.skeleton}><div className={styles.skeletonImage}/><div className={styles.skeletonBody}><div/><div/><div/><div/></div></div>)}</div>;
}

export function Feedback({ kind, onAction, message }) {
  const error = kind === 'error';
  return <div className={styles.feedback} role={error ? 'alert' : 'status'}><span className={styles.symbol}><Icon name={error ? 'globe' : 'search'} size={32}/></span><span className="eyebrow">{error ? 'SINAL INTERROMPIDO' : 'NENHUM SINAL ENCONTRADO'}</span><h3>{error ? 'Perdemos contato com esta dimensão.' : 'Nenhum personagem por aqui.'}</h3><p>{error ? message : 'Experimente outro nome ou ajuste os filtros para ampliar a busca.'}</p><button type="button" onClick={onAction}><Icon name={error ? 'reset' : 'close'} size={16}/>{error ? 'Tentar novamente' : 'Limpar filtros'}</button></div>;
}
