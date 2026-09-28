import { useTheme } from '../context/ThemeContext.jsx';
import { Icon } from './Icon.jsx';
import styles from './Header.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return <header className={styles.header}>
    <div className="container"><div className={styles.inner}>
      <a className={styles.brand} href="#inicio" aria-label="Multiverse Atlas, voltar ao início"><span className={styles.mark} aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12"/><ellipse cx="20" cy="20" rx="5.5" ry="12" transform="rotate(-26 20 20)"/><path d="M8.8 24.4c5.7-4.7 12.3-6.1 22.1-8.8"/><circle className={styles.orbitPoint} cx="29.5" cy="12.7" r="2.1"/></svg></span><span>MULTIVERSE<span className={styles.brandLight}>/ATLAS</span></span></a>
      <div className={styles.right}><span className={styles.edition}>EXPLORADOR INTERDIMENSIONAL <span>·</span> VOL. 01</span><button type="button" className={styles.theme} onClick={toggleTheme} aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`} title={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19}/></button></div>
    </div></div>
  </header>;
}
