"use client";

import styles from "./Track.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { useLikeButton } from "@/hooks/useLikeButton";
import { PlaylistType, TrackType } from "@/types/tracksTypes";
import { printTime } from "@/utils/datetime";
import { setActivePlaylistAndTrackInside } from "@/store/features/playlistSlice";

interface Props {
  playlist: PlaylistType;
  track: TrackType;
}

export default function Track({ playlist, track }: Props) {
  const dispatch = useAppDispatch();
  const { playlists, currentTrack, isPaused, isShuffled } = useAppSelector(
    (state) => state.player
  );
  const { isLiked, onLike } = useLikeButton(track);

  function getIndex(track: TrackType) {
    for (const record of playlists.indexes)
      if (record._id === track._id) return record.num;

    return null;
  }

  function handleTrackClick() {
    dispatch(setActivePlaylistAndTrackInside({ playlist, track }));
  }

  const isCurrent: boolean =
    Boolean(currentTrack) && currentTrack?._id === track._id;

  return (
    <div className={styles.trackContainer} onClick={handleTrackClick}>
      <div className={styles.track}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrent || isShuffled ? (
              isCurrent ? (
                <div
                  className={cn(styles.trackMark, {
                    [styles.animated]: !isPaused,
                  })}
                />
              ) : (
                <div className={cn(styles.trackMark, styles.trackNum)}>
                  {getIndex(track)}
                </div>
              )
            ) : (
              <svg>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className={styles.trackTitleText}>{track.name}</div>
        </div>
        <div className={styles.trackAuthor}>{track.author}</div>
        <div className={styles.trackAlbum}>{track.album}</div>
        <div className={styles.trackTime}>
          <div
            className={cn(shared.btnIcon, { [shared.liked]: isLiked })}
            onClick={onLike}
          >
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          </div>
          <span className={styles.trackTimeText}>
            {printTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
