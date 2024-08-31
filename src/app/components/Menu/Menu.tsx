import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a href="#" className={styles.menuLink}>
            Главное
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="#" className={styles.menuLink}>
            Мой плейлист
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="../signin.html" className={styles.menuLink}>
            Войти
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
