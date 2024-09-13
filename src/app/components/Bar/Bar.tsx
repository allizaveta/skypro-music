"use client";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import { Player } from "../Player/Player";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { Volume } from "../Volume/Volume";
import styles from "./Bar.module.css";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
const Bar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { currentTrack } = useCurrentTrack();
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentTrack || !currentAudio) {
      return;
    }
    setIsPlaying(true);
    setCurrentTime(0);
    currentAudio.currentTime = 0;
    currentAudio.play();
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }
  const { name, author, track_file } = currentTrack;

  const duration = audioRef.current?.duration || 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  if (!currentTrack) {
    return null;
  }

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          className={styles.audio}
          ref={audioRef}
          controls
          src={track_file}
        ></audio>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <Player handlePlay={handlePlay} isPlaying={isPlaying} />
            <TrackPlay name={name} author={author} />
          </div>
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Bar;
