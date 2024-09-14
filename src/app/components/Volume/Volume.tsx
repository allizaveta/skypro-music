import styles from "./Volume.module.css";
import classNames from "classnames";
import { RefObject, useEffect, useRef, useState } from "react";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";

type VolumeProps = {
  audioRef: RefObject<HTMLAudioElement>;
};

export function Volume({ audioRef }: VolumeProps) {
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/Image/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
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
