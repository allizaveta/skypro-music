"use client";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { quitUser } from "@/store/features/authSlice";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogoutClick = () => {
    if (user) {
      dispatch(quitUser());
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>
          {" "}
          {user ? user.username : ""}
        </p>
        <div className={styles.sidebarIcon} onClick={handleLogoutClick}>
          <svg>
            <use xlinkHref="Image/icon/sprite.svg#icon-logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/Image/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/Image/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/Image/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
