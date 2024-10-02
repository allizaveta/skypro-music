import { getCatalogs } from "@/store/features/playlistSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export function useInitCatalogs() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogs());
  }, [dispatch]);
}
