import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getFavouriteTracks } from "@/store/features/playlistSlice";

export function useInitFavouriteTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens.access) dispatch(getFavouriteTracks(tokens));
  }, [tokens, dispatch]);
}
