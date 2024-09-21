import styles from "./Volume.module.css";
import classNames from "classnames";
import { RefObject, useEffect, useRef, useState } from "react";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";

type VolumeProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Volume({ value, onChange }: VolumeProps) {
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
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
