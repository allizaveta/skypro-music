import Image from "next/image";
import styles from "./Nav.module.css";
import Menu from "../Menu/Menu";

const Nav = () => {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/Image/logo.png"
          width={114}
          height={17}
          alt="skypro logo"
        />
      </div>
      <div className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      <Menu />
    </nav>
  );
};

export default Nav;
