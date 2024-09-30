"use client";

import styles from "./Player.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import cn from "classnames";
import { useAppSelector } from "@/store/store";
import { TrackType } from "@/types/tracksTypes";
import ActiveTrack from "../ActiveTrack/ActiveTrack";

interface Props {
  currentTrack: TrackType;
  isLooped: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function Player({
  currentTrack,
  isLooped,
  togglePlay,
  toggleLoop,
  toggleShuffle,
  handlePrev,
  handleNext,
}: Props) {
  const { isPaused, isShuffled } = useAppSelector((state) => state.player);
  const state = isPaused ? "play" : "pause";

  return (
    <div className={styles.player}>
      <div className={styles.playerControls}>
        <div className={styles.playerBtnPrev} onClick={handlePrev}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div className={styles.playerBtnPlay} onClick={togglePlay}>
          <svg>
            <use xlinkHref={`/img/icon/sprite.svg#icon-${state}`} />
          </svg>
        </div>
        <div className={styles.playerBtnNext} onClick={handleNext}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div
          className={cn(styles.playerBtnRepeat, shared.btnIcon, {
            [shared.active]: isLooped,
          })}
          onClick={toggleLoop}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
          </svg>
        </div>
        <div
          className={cn(styles.playerBtnShuffle, shared.btnIcon, {
            [shared.active]: isShuffled,
          })}
          onClick={toggleShuffle}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
          </svg>
        </div>
      </div>

      <ActiveTrack currentTrack={currentTrack} />
    </div>
  );
}
