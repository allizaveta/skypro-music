import styles from "./Volume.module.css"
import classNames from "classnames"

export function Volume() {
    return(
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
            />
          </div>
        </div>
      </div>
    )
}