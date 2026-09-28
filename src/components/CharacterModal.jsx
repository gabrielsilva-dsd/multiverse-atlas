import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon.jsx';
import styles from './CharacterModal.module.css';

const labels = { Alive: 'Vivo', Dead: 'Morto', unknown: 'Desconhecido', Male: 'Masculino', Female: 'Feminino', Genderless: 'Sem gênero' };
const display = (value) => labels[value] ?? value ?? 'Desconhecido';

export function CharacterModal({ character, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const feedbackTimer = useRef(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);
  useEffect(() => { setCopyFeedback(''); window.clearTimeout(feedbackTimer.current); }, [character?.id]);

  /** Copia o endpoint sem levar o visitante para uma página de JSON bruto. */
  async function copyApiUrl() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(character.url);
      } else {
        const field = document.createElement('textarea');
        field.value = character.url;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        try { if (!document.execCommand('copy')) throw new Error('Cópia indisponível'); }
        finally { field.remove(); }
      }
      setCopyFeedback('success');
    } catch { setCopyFeedback('Não foi possível copiar. Tente novamente.'); }
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setCopyFeedback(''), 2000);
  }

  useEffect(() => {
    if (!character) return undefined;
    const previouslyFocused = document.activeElement;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusables = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      const first = focusables[0];
      const last = focusables.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = priorOverflow; previouslyFocused?.focus(); };
  }, [character, onClose]);

  if (!character) return null;
  return createPortal(<div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={styles.dialog} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className={styles.close} ref={closeRef} type="button" onClick={onClose} aria-label="Fechar detalhes"><Icon name="close" size={20}/></button>
      <div className={styles.visual}><img src={character.image} alt={`Retrato de ${character.name}`} width="300" height="300" /><span>ARQUIVO INTERDIMENSIONAL / {String(character.id).padStart(3, '0')}</span></div>
      <div className={styles.content}><p className="eyebrow">DOSSIÊ DE PERSONAGEM</p><h2 id={titleId}>{character.name}</h2><p className={styles.subtitle}><span className={`${styles.dot} ${styles[character.status.toLowerCase()] ?? styles.unknown}`}/>{display(character.status)} <span className={styles.separator}>/</span> {character.species}{character.type ? ` · ${character.type}` : ''}</p><div className={styles.rule}/>
        <dl className={styles.details}><div><dt>ORIGEM</dt><dd>{character.origin.name}</dd></div><div><dt>ÚLTIMA LOCALIZAÇÃO</dt><dd>{character.location.name}</dd></div><div><dt>GÊNERO</dt><dd>{display(character.gender)}</dd></div><div><dt>APARIÇÕES</dt><dd>{character.episode.length} episódios</dd></div></dl>
        <button type="button" className={styles.apiLink} onClick={copyApiUrl} aria-live="polite">{copyFeedback === 'success' ? 'Copiado com sucesso! ✓' : 'Copiar Endpoint da API'} {copyFeedback !== 'success' && <Icon name="arrow" size={17}/>}</button>
        <span className={styles.copyFeedback} role="status">{copyFeedback !== 'success' ? copyFeedback : ''}</span>
      </div>
    </section>
  </div>, document.body);
}
