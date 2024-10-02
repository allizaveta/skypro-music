import styles from "./ProgressBar.module.css";

import { ChangeEvent, RefObject, useCallback } from "react";

interface Props {
  audioRef: RefObject<HTMLAudioElement>;
  defaultMax: number;
  position: number;
}

export default function ProgressBar({ audioRef, defaultMax, position }: Props) {
  const handleSeek = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current)
        audioRef.current.currentTime = Number(event.target.value);
    },
    [audioRef]
  );

  return (
    <input
      className={styles.progressInput}
      type="range"
      min={0}
      max={audioRef.current?.duration || defaultMax}
      value={position}
      step={0.01}
      onChange={handleSeek}
    />
  );
}
