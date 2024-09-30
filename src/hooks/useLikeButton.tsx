import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TracksAPI } from "@/api/tracks";
import { TrackType } from "@/types/tracksTypes";
import { dislikeTrack, likeTrack } from "@/store/features/playlistSlice";

interface HookResult {
  isLiked: boolean;
  onLike: React.MouseEventHandler<HTMLDivElement>;
}

export function useLikeButton(currentTrack: TrackType): HookResult {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  const favouriteTracks = useAppSelector(
    (state) => state.player.playlists.favourite
  );

  const isLiked: boolean = Boolean(
    tokens.access &&
      favouriteTracks.find((track) => track._id === currentTrack._id)
  );

  const handleLike = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!tokens.access || !tokens.refresh) return;

    try {
      await TracksAPI.changeLikeTrack(currentTrack._id, !isLiked, tokens);

      if (isLiked) dispatch(dislikeTrack(currentTrack));
      else dispatch(likeTrack(currentTrack));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { isLiked, onLike: handleLike };
}
