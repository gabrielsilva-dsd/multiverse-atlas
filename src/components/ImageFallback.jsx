import { useEffect, useState } from 'react';
import styles from './ImageFallback.module.css';

/** Mantém a arte local visível quando o retrato remoto falha ou ainda não carregou. */
export function ImageFallback({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setLoaded(false);
    setFailed(!src);
  }, [src]);

  return <div className={styles.frame} aria-hidden="true">
    <div className={styles.fallback} />
    {!loaded && !failed && <div className={styles.skeleton} />}
    {!failed && <img
      className={`${styles.image} ${loaded ? styles.loaded : ''}`}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      width="300"
      height="300"
      onLoad={() => setLoaded(true)}
      onError={() => { setFailed(true); setLoaded(false); }}
    />}
  </div>;
}
