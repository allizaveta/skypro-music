"use client";

import styles from "./Tracks.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { TracksAPI } from "@/api/tracks";
import { ErrorMessage, isError } from "@/types/errorsTypes";
import { setPlaylist } from "@/store/features/playlistSlice";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";

export default function Home() {
  const dispatch = useAppDispatch();
  const { playlists, filters } = useAppSelector((state) => state.player);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    setIsLoading(true);

    TracksAPI.getTracks()
      .then((data) => {
        if (isError(data)) {
          setErrorMsg(data as ErrorMessage);

          data = [];
        }

        dispatch(setPlaylist({ kind: "initial", playlist: data }));
        dispatch(setPlaylist({ kind: "visible", playlist: data }));

        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof Error)
          setErrorMsg({ status: 0, endpoint: "", message: error.message });
        else
          setErrorMsg({
            status: 0,
            endpoint: "",
            message: "Неизвестная ошибка",
          });
      });
  }, []);

  return (
    <>
      <h2 className={styles.mainTitle}>Треки</h2>
      <Filter
        visiblePlaylist={playlists.visible}
        filteredPlaylist={playlists.filtered}
        filters={filters}
      />
      <Playlist
        playlist={playlists.sorted}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </>
  );
}
