import { getfavoriteTracks } from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

export function useInitfavoriteTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens.access) dispatch(getfavoriteTracks(tokens));
  }, [tokens, dispatch]);
}
