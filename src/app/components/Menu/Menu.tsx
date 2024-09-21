import Link from "next/link";
import styles from "./Menu.module.css";
import { quitUser } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Menu = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  const isLogin = !!tokens.access;

  const handleLogout = () => {
    dispatch(quitUser());
  };
  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href={"/"} className={styles.menuLink}>
            Главное
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href={"/favorite"} className={styles.menuLink}>
            Мой плейлист
          </Link>
        </li>
        <li className={styles.menuItem}>
          {isLogin ? (
            <li className={styles.menuItem}>
              <a onClick={handleLogout} className={styles.menuLink}>
                Выйти
              </a>
            </li>
          ) : (
            <li className={styles.menuItem}>
              <Link href={"/login"} className={styles.menuLink}>
                Войти
              </Link>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
