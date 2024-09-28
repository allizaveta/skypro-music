"use client";

import styles from "./Bar.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { printTime } from "@/utils/datetime";
import {
  getEmptyTrack,
  selectNextTrack,
  selectPrevTrack,
  setIsPaused,
  toggleIsShuffled,
} from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import ProgressBar from "./ProgressBar/ProgressBar";
import Player from "../Player/Player";
import Volume from "../Volume/Volume";

export default function Bar() {
  const dispatch = useAppDispatch();
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentAudio = audioRef?.current;

  useEffect(() => {
    if (!currentTrack || !currentAudio) return;

    dispatch(setIsPaused(false));
    setPosition(0);

    audioRef.current.currentTime = 0;
    currentAudio.play();
  }, [currentTrack]);

  useEffect(() => {
    if (currentAudio) {
      audioRef.current.loop = isLooped;
    }
  }, [isLooped]);

  function togglePlay() {
    if (!currentAudio || !currentTrack || !currentTrack._id) return;

    if (currentAudio.paused) currentAudio.play();
    else currentAudio.pause();

    dispatch(setIsPaused(currentAudio.paused));
  }

  function toggleLoop() {
    setIsLooped((prev) => !prev);
  }

  function toggleShuffled() {
    dispatch(toggleIsShuffled());
  }

  function handleTimeUpdate(event: ChangeEvent<HTMLAudioElement>) {
    setPosition(event.currentTarget.currentTime);
  }

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    if (currentAudio) currentAudio.currentTime = Number(event.target.value);
  }

  function goNextTrack() {
    if (!isLooped) dispatch(selectNextTrack(true));
  }

  function handleNextTrack() {
    dispatch(selectNextTrack(false));
  }

  function handlePrevTrack() {
    dispatch(selectPrevTrack());
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          className={styles.barAudio}
          src={currentTrack?.track_file}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={goNextTrack}
        />

        <ProgressBar
          max={currentAudio?.duration || 0}
          position={position}
          handleSeek={handleSeek}
        />

        <div className={styles.barPlayer}>
          <Player
            currentTrack={currentTrack ?? getEmptyTrack()}
            isLooped={isLooped}
            handlePrev={handlePrevTrack}
            handleNext={handleNextTrack}
            togglePlay={togglePlay}
            toggleLoop={toggleLoop}
            toggleShuffle={toggleShuffled}
          />

          <Volume audioRef={audioRef} />

          <span className={styles.barTimers}>
            {currentAudio &&
              !isNaN(currentAudio.duration) &&
              `${printTime(currentAudio.currentTime)} / ${printTime(
                currentAudio.duration
              )}`}
          </span>
        </div>
      </div>
    </div>
  );
}
