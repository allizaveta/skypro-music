import { TrackType } from "@/types/tracks";
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import classNames from "classnames";
import useLikeTrack from "@/utils/useLikeTrack";

type TrackProps = {
  track: TrackType;
  tracks: TrackType[];
};

const Track = ({ track, tracks }: TrackProps) => {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const { name, author, album, duration_in_seconds, _id } = track;
  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useLikeTrack(track._id);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracks }));
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?._id === _id ? (
              <svg
                className={classNames(styles.playingTrack, {
                  [styles.active]: currentTrack?._id === _id && isPlaying,
                })}
              >
                <use xlinkHref="Image/icon/sprite.svg#icon-playingTrack"></use>
              </svg>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="Image/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className="track__time" onClick={handleLike}>
          {isLiked ? (
            <svg className={styles.trackTimeSvgDislike}>
              <use xlinkHref="Image/icon/sprite.svg#icon-like" />
            </svg>
          ) : (
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="Image/icon/sprite.svg#icon-like" />
            </svg>
          )}
          <span className={styles.trackTimeText}>
            {formatDuration(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
