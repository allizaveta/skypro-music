"use client";

import Filter from "@/components/Filter/Filter";
import styles from "../Tracks.module.css";

import { useAppSelector } from "@/store/store";
import Playlist from "@/components/Playlist/Playlist";

export default function Home() {
  const favouriteTracks = useAppSelector(
    (state) => state.playlist.favoriteTracks
  );

  return (
    <>
      <h2 className={styles.mainTitle}>Любимые треки</h2>
      <Filter playlist={favouriteTracks} />
      <Playlist playlist={favouriteTracks} errorMsg={null} />
    </>
  );
}
