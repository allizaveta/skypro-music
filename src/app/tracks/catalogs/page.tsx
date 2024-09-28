"use client";

import styles from "../../Tracks.module.css";
import { useEffect } from "react";

import { TracksAPI } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import { isError } from "@/types/errorsTypes";
import {
  setActivePlaylist,
  setCatalogName,
} from "@/store/features/playlistSlice";

interface Props {
  params: {
    id: string;
  };
}

export default function Catalog({ params }: Props) {
  const dispatch = useAppDispatch();
  const { activePlaylist, catalogName } = useAppSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    Promise.all([
      TracksAPI.getTracks(),
      TracksAPI.getCatalogTracks(params.id),
    ]).then(([responseTracks, responseCategory]) => {
      if (isError(responseTracks)) return;

      const tracks = responseTracks.filter((track) =>
        responseCategory.items.includes(track._id)
      );

      dispatch(setActivePlaylist(tracks));
      dispatch(setCatalogName(responseCategory.name));
    });
  }, []);

  return (
    <>
      <h2 className={styles.mainTitle}>{catalogName}</h2>
      <Filter playlist={activePlaylist} />
      <Playlist playlist={activePlaylist} errorMsg={null} />
    </>
  );
}
