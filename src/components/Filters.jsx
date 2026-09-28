import { Icon } from './Icon.jsx';
import styles from './Filters.module.css';

const options = {
  status: [['', 'Todos os status'], ['alive', 'Vivo'], ['dead', 'Morto'], ['unknown', 'Desconhecido']],
  species: [['', 'Todas as espécies'], ['Human', 'Humano'], ['Alien', 'Alienígena'], ['Humanoid', 'Humanoide'], ['Robot', 'Robô'], ['Animal', 'Animal'], ['Mythological Creature', 'Criatura mitológica']],
  gender: [['', 'Todos os gêneros'], ['Female', 'Feminino'], ['Male', 'Masculino'], ['Genderless', 'Sem gênero'], ['unknown', 'Desconhecido']],
};

export function Filters({ query, onQueryChange, filters, onFilterChange, onClear, hasFilters }) {
  return <div className={styles.panel}>
    <div className={styles.heading}><div><p className="eyebrow">ENCONTRE SEU PRÓXIMO UNIVERSO</p><h2 id="explorar">Explore os <span>personagens</span></h2></div><span className={styles.index}>01 / DIRETÓRIO</span></div>
    <div className={styles.controls} role="search" aria-label="Buscar personagens">
      <label className={styles.search}><Icon name="search" size={20}/><span className="srOnly">Buscar pelo nome</span><input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Busque um personagem..." autoComplete="off" /></label>
      {Object.entries(options).map(([key, values]) => <label className={styles.selectWrap} key={key}><span className="srOnly">{key === 'status' ? 'Filtrar por status' : key === 'species' ? 'Filtrar por espécie' : 'Filtrar por gênero'}</span><select value={filters[key]} onChange={(event) => onFilterChange(key, event.target.value)}>{values.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>)}
      {hasFilters && <button type="button" className={styles.clear} onClick={onClear}><Icon name="reset" size={16}/> Limpar</button>}
    </div>
  </div>;
}
