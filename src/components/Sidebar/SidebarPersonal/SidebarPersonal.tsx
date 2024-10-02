"use client";

import styles from "../Sidebar.module.css";

import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useQuit } from "@/hooks/useQuit";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setIsPaused } from "@/store/features/playlistSlice";
import { useInitFavouriteTracks } from "@/hooks/useInitFavoriteTracks";

export default function SidebarPersonal() {
  useInitFavouriteTracks();

  const router = useSafeRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { onQuit } = useQuit();

  function handleSigning() {
    if (user && user.username) return onQuit();

    router.replace("/sign/in");

    dispatch(setIsPaused(true));
  }

  return (
    <div className={styles.sidebarPersonal}>
      {user && user.username && (
        <p className={styles.sidebarPersonalName}>{user.username}</p>
      )}
      <div className={styles.sidebarIcon} onClick={handleSigning}>
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#icon-logout" />
        </svg>
      </div>
    </div>
  );
}
