"use client";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { Centerblock } from "../components/Centerblock/Centerblock";

export default function FavoritePage() {
  const favoriteTracks = useAppSelector(
    (state) => state.playlist.favoriteTracksList
  );
  const { user } = useAppSelector((state) => state.user);
  const filteredTracks = useFilteredTracks(favoriteTracks);

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return <Centerblock tracks={filteredTracks} title={"Мои треки"} />;
}
