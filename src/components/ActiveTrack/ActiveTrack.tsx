"use client";

import { useLikeButton } from "@/hooks/useLikeButton";
import styles from "./ActiveTrack.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import { TrackType } from "@/types/tracksTypes";
import cn from "classnames";
import React from "react";

interface Props {
  currentTrack: TrackType;
}

function ActiveTrack({ currentTrack }: Props) {
  const { isLiked, onLike } = useLikeButton(currentTrack);

  if (!currentTrack._id)
    return (
      <div className={cn(styles.track, styles.emptyTrack)}>
        <div className={styles.trackImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={cn(styles.trackAlbum, styles.trackAlbumLink)}>
          Не выбрана песня
        </div>
      </div>
    );

  return (
    <div className={styles.track}>
      <div className={styles.trackContainer}>
        <div className={styles.trackImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {currentTrack.name}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {currentTrack.author}
          </a>
        </div>
      </div>
      <div
        className={cn(styles.trackLikeContainer, shared.btnIcon, {
          [shared.liked]: isLiked,
        })}
        onClick={onLike}
      >
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#icon-like" />
        </svg>
      </div>
    </div>
  );
}

export default React.memo(ActiveTrack);
