"use client";
import { Player } from "../Player/Player";
import { Volume } from "../Volume/Volume";
import styles from "./Bar.module.css";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { playTime } from "@/utils/playTime";
import {
  setIsPlaying,
  setNextTrack,
  setIsLoop,
} from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Bar = () => {
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);

  const audioRef = useRef<HTMLAudioElement>(null);

  const duration = audioRef.current?.duration || 0;

  const {
    currentTrack: track,
    isPlaying,
    isLoop,
  } = useAppSelector((state) => state.playlist);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (track) {
        audio.src = track.track_file;
        audio.play();
        dispatch(setIsPlaying(true));
      }
    }
  }, [track, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      dispatch(setNextTrack());
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [track, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!track) {
    return null;
  }

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  }

  function handleLoop() {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      dispatch(setIsLoop(!isLoop));
    }
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          ref={audioRef}
          src={track?.track_file}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
        />
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <span className={styles.barTimers}>
          {audioRef.current &&
            !isNaN(audioRef.current.duration) &&
            `${playTime(audioRef.current.currentTime)} / ${playTime(
              audioRef.current.duration
            )}`}
        </span>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <Player
              track={track}
              togglePlay={togglePlay}
              handleLoop={handleLoop}
            />
          </div>
          <Volume
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Bar;
