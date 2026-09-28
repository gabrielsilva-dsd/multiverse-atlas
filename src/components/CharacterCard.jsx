import styles from './CharacterCard.module.css';
import { ImageFallback } from './ImageFallback.jsx';

const statusNames = { Alive: 'Vivo', Dead: 'Morto', unknown: 'Desconhecido' };

export function CharacterCard({ character, onOpen, priority = false }) {
  return <button type="button" className={styles.card} onClick={() => onOpen(character)} aria-label={`Ver detalhes de ${character.name}`}>
    <div className={styles.imageWrap}><ImageFallback key={character.image} src={character.image} priority={priority} /><span className={`${styles.status} ${styles[character.status.toLowerCase()] ?? styles.unknown}`}><span/> {statusNames[character.status] ?? character.status}</span></div>
    <div className={styles.body}><span className={styles.code}>PERSONAGEM / {String(character.id).padStart(3, '0')}</span><h3>{character.name}</h3><div className={styles.divider}/><div className={styles.meta}><span>ESPÉCIE</span><strong>{character.species}</strong></div><div className={styles.meta}><span>ORIGEM</span><strong title={character.origin.name}>{character.origin.name}</strong></div></div>
    <span className={styles.corner} aria-hidden="true">↗</span>
  </button>;
}
