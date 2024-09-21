import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getFavoriteTracks } from "@/store/features/playlistSlice";

export function useInitLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens?.access && tokens?.refresh) {
      dispatch(
        getFavoriteTracks({ access: tokens.access, refresh: tokens.refresh })
      );
    }
  }, [tokens, dispatch]);
}
