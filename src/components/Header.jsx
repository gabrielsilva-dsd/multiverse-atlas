import { useTheme } from '../context/ThemeContext.jsx';
import { Icon } from './Icon.jsx';
import styles from './Header.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return <header className={styles.header}>
    <div className="container"><div className={styles.inner}>
      <a className={styles.brand} href="#inicio" aria-label="Multiverse Atlas, voltar ao início"><span className={styles.mark}><Icon name="spark" size={21}/></span><span>MULTIVERSE<span className={styles.brandLight}>/ATLAS</span></span></a>
      <div className={styles.right}><span className={styles.edition}>EXPLORADOR INTERDIMENSIONAL <span>·</span> VOL. 01</span><button type="button" className={styles.theme} onClick={toggleTheme} aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`} title={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19}/></button></div>
    </div></div>
  </header>;
}
