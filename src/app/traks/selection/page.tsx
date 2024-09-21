"use client";

import { Centerblock } from "@/app/components/Centerblock/Centerblock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";
import { getSelectionTracks } from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectionTracks, selectionName } = useAppSelector(
    (state) => state.playlist
  );

  const filteredTracks = useFilteredTracks(selectionTracks);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getSelectionTracks(id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch, id]);

  return <Centerblock tracks={filteredTracks} title={selectionName} />;
}
