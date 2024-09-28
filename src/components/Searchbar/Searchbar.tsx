import styles from "./Searchbar.module.css";

export default function Searchbar() {
  return (
    <div className={styles.search}>
      <svg>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
