import styles from "./Player.module.css";
import classNames from "classnames";

type PlayerProps = {
  handlePlay: () => void;
};

export function Player({ handlePlay }: PlayerProps) {
  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-prev"></use>
        </svg>
      </div>
      <div className={styles.playerBtnPlay} onClick={handlePlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-play"></use>
        </svg>
      </div>
      <div className={styles.playerBtnNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-next"></use>
        </svg>
      </div>
      <div className={classNames(styles.playerBtnRepeat, styles._btnIcon)}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-repeat"></use>
        </svg>
      </div>
      <div className={classNames(styles.playerBtnShuffle, styles._btnIcon)}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="/Image/icon/sprite.svg#icon-shuffle"></use>
        </svg>
      </div>
    </div>
  );
}
