import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import globeVideo from '../assets/multiverse-globe.mp4';
import globePoster from '../assets/multiverse-globe-poster.webp';
import styles from './Hero.module.css';

/** Tenta autoplay silencioso; oferece reprodução por clique se o navegador o bloquear. */
export function Hero() {
  const videoRef = useRef(null);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [videoError, setVideoError] = useState(false);

  function playVideo() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play()
      .then(() => { setNeedsGesture(false); setVideoError(false); })
      .catch(() => setNeedsGesture(true));
  }

  useEffect(() => {
    playVideo();
    const timer = window.setTimeout(() => {
      if (videoRef.current?.paused) setNeedsGesture(true);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
    <div className={styles.copy}>
      <p className={styles.eyebrow}><span className={styles.pulse} /> O MULTIVERSO ESTÁ ABERTO</p>
      <h1 id="hero-title">Cada universo tem <em>uma história.</em></h1>
      <p className={styles.description}>Explore personagens, descubra suas origens e navegue pelas infinitas possibilidades do multiverso.</p>
      <a href="#explorar" className={styles.link}>Comece a explorar <Icon name="arrow" size={17} /></a>
    </div>
    <div className={styles.art}>
      <div className={styles.portalScene}>
        <video
          ref={videoRef}
          className={styles.portalVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={globePoster}
          width="960"
          height="540"
          aria-hidden="true"
          onCanPlay={() => { if (videoRef.current?.paused && !needsGesture) playVideo(); }}
          onPlaying={() => setNeedsGesture(false)}
          onPause={() => setNeedsGesture(true)}
          onError={() => { setVideoError(true); setNeedsGesture(true); }}
        >
          <source src={globeVideo} type="video/mp4" />
        </video>
        {needsGesture && <button type="button" className={styles.playButton} onClick={playVideo}>
          <span className={styles.playSymbol} aria-hidden="true">▶</span>
          {videoError ? 'Tentar reproduzir' : 'Reproduzir globo'}
        </button>}
      </div>
      <span className={styles.coordinate} aria-hidden="true">C-137 / ∞</span>
    </div>
  </section>;
}
