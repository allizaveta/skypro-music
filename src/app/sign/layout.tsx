import type { Metadata } from "next";

import styles from "./Signing.module.css";

import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SkyPro Music: Signing",
  description: "Listen every song everywhere",
};

type RootLayoutType = Readonly<{ children: React.ReactNode }>;

export default function SigningLayout({ children }: RootLayoutType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.modalBlock}>
          <form className={styles.modalForm} action="#">
            <Link className={styles.modalLogo} href="../">
              <Image
                src="/img/logo_modal.png"
                alt="logo"
                width={140}
                height={22}
              />
            </Link>

            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
