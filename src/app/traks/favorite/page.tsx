"use client";
import { Centerblock } from "@/app/components/Centerblock/Centerblock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";

export default function FavoritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);
  const { user } = useAppSelector((state) => state.user);
  const filteredTracks = useFilteredTracks(favoriteTracks);

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return <Centerblock tracks={filteredTracks} title={"Мои треки"} />;
}
