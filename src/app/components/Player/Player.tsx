"use client";
import { useEffect } from "react";
import styles from "./Player.module.css";
import classNames from "classnames";

type PlayerProps = {
  handlePlay: () => void;
  isPlaying: boolean;
  repeatTrack: () => void;
  isLoop: boolean;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  handleIsShuffle: () => void;
  isShuffle: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
};

export function Player({
  handlePlay,
  isPlaying,
  repeatTrack,
  isLoop,
  handleNextTrack,
  handlePrevTrack,
  handleIsShuffle,
  isShuffle,
  audioRef,
}: PlayerProps) {
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        handleNextTrack();
      };

      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef, handleNextTrack]);

  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev} onClick={handlePrevTrack}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-prev"></use>
        </svg>
      </div>
      <div className={styles.playerBtnPlay} onClick={handlePlay}>
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
      <div className={styles.playerBtnNext} onClick={handleNextTrack}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-next"></use>
        </svg>
      </div>
      <div
        className={classNames(styles.playerBtnRepeat, styles._btnIcon, {
          [styles.active]: isLoop,
        })}
        onClick={repeatTrack}
      >
        <svg className={classNames(styles.playerBtnRepeatSvg)}>
          <use xlinkHref="Image/icon/sprite.svg#icon-repeat" />
        </svg>
      </div>
      <div
        onClick={handleIsShuffle}
        className={classNames(styles.playerBtnShuffle, styles._btnIcon, {
          [styles.active]: isShuffle,
        })}
      >
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-shuffle"></use>
        </svg>
      </div>
    </div>
  );
}
