"use client";

import styles from "./Volume.module.css";
import cn from "classnames";
import { RefObject, useEffect, useState } from "react";

interface Props {
  audioRef: RefObject<HTMLAudioElement>;
}

export default function Volume({ audioRef }: Props) {
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={cn(styles.volumeProgress, styles._btn)}>
          <input
            className={cn(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
