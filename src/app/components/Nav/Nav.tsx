"use client";
import Image from "next/image";
import styles from "./Nav.module.css";
import Menu from "../Menu/Menu";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <div
        className={styles.navBurger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && <Menu />}
    </nav>
  );
};

export default Nav;
