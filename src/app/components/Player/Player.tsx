"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Player.module.css";
import classNames from "classnames";
import { TrackType } from "@/types/tracks";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import {
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type PlayerProps = {
  track: TrackType | null;
  togglePlay: () => void;
  handleLoop: () => void;
};

export function Player({ track, togglePlay, handleLoop }: PlayerProps) {
  const dispatch = useAppDispatch();

  const { isShuffle, initialPlaylist, isPlaying, isLoop } = useAppSelector(
    (state) => state.playlist
  );

  const { isLiked, handleLike } = useLikeTrack(track!);

  const [animateLike, setAnimateLike] = useState(false);

  const handleLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnimateLike(true);
    handleLike(event);

    setTimeout(() => {
      setAnimateLike(false);
    }, 300);
  };

  const playlist = useMemo(() => {
    return isShuffle
      ? [...initialPlaylist].sort(() => Math.random() - 0.5)
      : initialPlaylist;
  }, [isShuffle, initialPlaylist]);

  const nextTrack = () => {
    const currentIndex = playlist.findIndex((t) => t._id === track?._id);

    if (currentIndex < playlist.length - 1) {
      dispatch(setNextTrack());
    }
  };

  const prevTrack = () => {
    const currentIndex = playlist.findIndex((t) => t._id === track?._id);

    if (currentIndex > 0) {
      dispatch(setPrevTrack());
    }
  };

  const toggleShuffle = () => {
    dispatch(setIsShuffle(isShuffle ? false : true));
  };
  return (
    <>
      <div className={styles.playerControls}>
        <div className={styles.playerBtnPrev} onClick={prevTrack}>
          <svg className={styles.playerBtnPrevSvg}>
            <use xlinkHref="/Image/icon/sprite.svg#icon-prev"></use>
          </svg>
        </div>
        <div className={styles.playerBtnPlay} onClick={togglePlay}>
          {isPlaying ? (
            <svg className={styles.playerBtnPlaySvg}>
              <use xlinkHref="/Image/icon/sprite.svg#icon-pause" />
            </svg>
          ) : (
            <svg className={styles.playerBtnPlaySvg}>
              <use xlinkHref="/Image/icon/sprite.svg#icon-play" />
            </svg>
          )}
        </div>
        <div className={styles.playerBtnNext} onClick={nextTrack}>
          <svg className={styles.playerBtnNextSvg}>
            <use xlinkHref="/Image/icon/sprite.svg#icon-next"></use>
          </svg>
        </div>
        <div
          className={classNames(styles.playerBtnRepeat, styles._btnIcon, {
            [styles.active]: isLoop,
          })}
          onClick={handleLoop}
        >
          <svg className={classNames(styles.playerBtnRepeatSvg)}>
            <use xlinkHref="Image/icon/sprite.svg#icon-repeat" />
          </svg>
        </div>
        <div
          onClick={toggleShuffle}
          className={classNames(styles.playerBtnShuffle, styles._btnIcon, {
            [styles.active]: isShuffle,
          })}
        >
          <svg className={styles.playerBtnShuffleSvg}>
            <use xlinkHref="/Image/icon/sprite.svg#icon-shuffle"></use>
          </svg>
        </div>
      </div>
      <div className={styles.playerTrackPlay}>
        <div className={styles.trackPlayContain}>
          <div className={styles.trackPlayImage}>
            <svg className={styles.trackPlaySvg}>
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.trackPlayAuthor}>
            <a className={styles.trackPlayAuthorLink} href="http://">
              {track?.name}
            </a>
          </div>
          <div className={styles.trackPlayAlbum}>
            <a className={styles.trackPlayAlbumLink} href="http://">
              {track?.author}
            </a>
          </div>
        </div>

        <div className={styles.trackPlayLikeDis}>
          <div
            className={classNames(styles.trackPlayLike, styles.btnIcon, {
              [styles.liked]: isLiked && animateLike,
              [styles.disliked]: !isLiked && animateLike,
            })}
            onClick={handleLikeClick}
          >
            <svg className={styles.trackPlayLikeSvg}>
              <use
                href={`/img/icon/sprite.svg#icon-${
                  isLiked ? "like" : "dislike"
                }`}
              ></use>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
