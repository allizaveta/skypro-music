"use client";

import styles from "../Tracks.module.css";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { checkToken } from "@/store/features/userSlice";
import { setPlaylist } from "@/store/features/playlistSlice";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";

export default function Home() {
  const dispatch = useAppDispatch();
  const { playlists, filters } = useAppSelector((state) => state.player);
  const hasToken = useAppSelector(checkToken);

  function doRedirectIfAnonymous() {
    if (!hasToken) redirect("/tracks");
  }

  useEffect(() => {
    dispatch(setPlaylist({ kind: "visible", playlist: playlists.favourite }));
  }, []);

  useEffect(() => {
    doRedirectIfAnonymous();
  }, [hasToken]);

  doRedirectIfAnonymous();

  return (
    <>
      <h2 className={styles.mainTitle}>Любимые треки</h2>
      <Filter
        visiblePlaylist={playlists.visible}
        filteredPlaylist={playlists.filtered}
        filters={filters}
      />
      <Playlist playlist={playlists.sorted} isLoading={false} errorMsg={null} />
    </>
  );
}
