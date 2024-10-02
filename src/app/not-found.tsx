"use client";

import styles from "@/app/tracks/Tracks.module.css";
import signing from "@/app/sign/Signing.module.css";
import cn from "classnames";
import Image from "next/image";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import Searchbar from "@/components/Searchbar/Searchbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";

export default function NotFound() {
  const router = useRouter();

  function handleRedirectToMain(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    router.push("../");
  }

  return (
    <div className="wrapper">
      <div className="container">
        <main className={cn(styles.mainContainer, styles.showError)}>
          <Nav />

          <div className={styles.main}>
            <Searchbar />
          </div>

          <div className={styles.error}>
            <h1>404</h1>
            <div className={styles.subtitle}>
              <h2>Страница не найдена</h2>
              <Image
                src="/img/crying.png"
                alt="crying"
                width={52}
                height={52}
              />
            </div>
            <p>
              Возможно, она была удалена
              <br />
              или перенесена на другой адрес
            </p>
            <button
              className={signing.modalEnter}
              onClick={handleRedirectToMain}
            >
              Вернуться на главную
            </button>
          </div>

          <Sidebar />
        </main>

        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
