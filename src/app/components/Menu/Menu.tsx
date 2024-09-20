import Link from "next/link";
import styles from "./Menu.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { quitUser } from "@/store/features/authSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);

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
          <Link href={"/tracks/myTrack"} className={styles.menuLink}>
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
