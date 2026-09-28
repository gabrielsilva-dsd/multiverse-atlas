import { useState } from 'react';
import styles from './ImageFallback.module.css';

/** Mantém a arte local visível quando o retrato remoto falha ou ainda não carregou. */
export function ImageFallback({ src, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return <div className={styles.frame} aria-hidden="true">
    <div className={styles.fallback} />
    {!loaded && !failed && <div className={styles.loadingHint} />}
    {!failed && <img
      className={`${styles.image} ${loaded ? styles.loaded : ''}`}
      src={src}
      alt=""
      loading="eager"
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      width="300"
      height="300"
      onLoad={() => setLoaded(true)}
      onError={() => { setFailed(true); setLoaded(false); }}
    />}
  </div>;
}
