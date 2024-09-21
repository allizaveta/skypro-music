import { TrackType } from "@/types/tracks";
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import classNames from "classnames";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { useState } from "react";
import { formatTime } from "@/utils/formatTime";

type TrackProps = {
  track: TrackType;
  tracks: TrackType[];
};

const Track = ({ track, tracks }: TrackProps) => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.playlist);
  const { isLiked, handleLike } = useLikeTrack(track);

  const { name, author, album, duration_in_seconds } = track;
  const conditionCurrentTrack = currentTrack?._id === track._id;

  const [animateLike, setAnimateLike] = useState(false);

  const handleSelectTrack = () => {
    dispatch(setCurrentTrack({ currentTrack: track, playlist: tracks }));
  };

  const handleLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnimateLike(true);
    handleLike(event);

    setTimeout(() => {
      setAnimateLike(false);
    }, 300);
  };

  return (
    <div onClick={handleSelectTrack} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {conditionCurrentTrack && (
              <div
                className={classNames(styles.blinkedMark, {
                  [styles.active]: isPlaying,
                })}
              ></div>
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
            {formatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
