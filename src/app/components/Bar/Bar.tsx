"use client";
import { Player } from "../Player/Player";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { Volume } from "../Volume/Volume";
import styles from "./Bar.module.css";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { playTime } from "@/utils/playTime";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
  playTrack,
  pauseTrack,
} from "@/store/features/playlistSlice";
const Bar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const dispatch = useAppDispatch();

  const handleNextTrack = () => {
    dispatch(setNextTrack());
  };
  const handlePrevTrack = () => {
    dispatch(setPrevTrack());
  };
  const handleIsShuffle = () => {
    dispatch(setIsShuffle(!isShuffle));
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentTrack || !currentAudio) {
      return;
    }
    dispatch(playTrack());
    setCurrentTime(0);
    currentAudio.currentTime = 0;
    currentAudio.play();
  }, [currentTrack, dispatch]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      dispatch(pauseTrack());
    } else {
      audio.play();
      dispatch(playTrack());
    }
  };

  const repeatTrack = () => {
    setIsLoop(!isLoop);
    audioRef.current!.loop = !isLoop;
  };

  function updateTime(e: React.ChangeEvent<HTMLAudioElement>) {
    setCurrentTime(e.currentTarget.currentTime);
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  if (!currentTrack) {
    return null;
  }

  const { name, author, track_file } = currentTrack;
  const duration = audioRef.current?.duration || 0;

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          className={styles.audio}
          ref={audioRef}
          controls
          src={track_file}
          onTimeUpdate={updateTime}
        ></audio>
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
              handlePlay={handlePlay}
              isPlaying={isPlaying}
              repeatTrack={repeatTrack}
              isLoop={isLoop}
              handleNextTrack={handleNextTrack}
              handlePrevTrack={handlePrevTrack}
              handleIsShuffle={handleIsShuffle}
              isShuffle={isShuffle}
            />
            <TrackPlay name={name} author={author} />
          </div>
          <Volume audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default Bar;
