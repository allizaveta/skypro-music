"use client";
import {useCurrentTrack} from "@/contexts/CurrentTrackProvider";
import { Player } from "../Player/Player";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { Volume } from "../Volume/Volume";
import styles from "./Bar.module.css";
const Bar = () => {
  const { currentTrack } = useCurrentTrack();
  if (!currentTrack){
    return null;
  }
  const {name, author} = currentTrack;
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <Player />
            <TrackPlay name={name} author={author} />
          </div>
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Bar;
