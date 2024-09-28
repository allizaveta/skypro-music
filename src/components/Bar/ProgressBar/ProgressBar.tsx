import styles from "./ProgressBar.module.css";

import { ChangeEventHandler } from "react";

interface Props {
  max: number;
  position: number;
  handleSeek: ChangeEventHandler<HTMLInputElement>;
}

export default function ProgressBar({ max, position, handleSeek }: Props) {
  return (
    <input
      className={styles.progressInput}
      type="range"
      min={0}
      max={max}
      value={position}
      step={0.01}
      onChange={handleSeek}
    />
  );
}
