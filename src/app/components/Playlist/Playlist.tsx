"use client";
import { TrackType } from "@/types/tracks";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import Track from "../Track/Track";
type PlaylistProps = {
  tracks: TrackType[];
};

const Playlist = ({ tracks }: PlaylistProps) => {
  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classNames(styles.playlistTitle__col, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitle__col, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitle__col, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitle__col, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="Image/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {tracks.map((track) => (
          <Track key={track.id} track={track} tracks={tracks} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
