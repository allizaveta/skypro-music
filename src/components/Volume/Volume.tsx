"use client";

import styles from "./Volume.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import cn from "classnames";

import { ChangeEvent, RefObject, useEffect, useState } from "react";

interface Props {
  audioRef: RefObject<HTMLAudioElement>;
}

export default function Volume({ audioRef }: Props) {
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  function handleChangeVolume(event: ChangeEvent<HTMLInputElement>) {
    setVolume(Number(event.target.value));
  }

  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <svg className={styles.volumeImage}>
          <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
        </svg>
        <input
          className={cn(styles.volumeProgress, shared.btn)}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleChangeVolume}
        />
      </div>
    </div>
  );
}
