"use client";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AddPlayListsIcon,
  HeartIcon,
  NextSongIcon,
  PauseSongIcon,
  PlayAudioIcon,
  PrevSongIcon,
  RepeatOneSongIcon,
  RepeatSongIcon,
  ShuffleIcon,
  VolumeIcon,
} from "../Svglist";
import { GetPageContext } from "../../contexts/PageContext";

export const AudioControlBar = () => {
  const { music } = useContext(GetPageContext);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatSongState, setRepeatSongState] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const stopAllSound = () => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.pause();
    });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        stopAllSound();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // // Reset the state when the audio ends
  // useEffect(() => {
  //   if (audioRef.current) {
  //     setDuration(Math.floor(audioRef.current.duration));
  //     audioRef.current.addEventListener("ended", handleAudioEnded);

  //     return () => {
  //       audioRef.current?.removeEventListener("ended", handleAudioEnded);
  //     };
  //   }
  // }, [audioRef.current]);

  const handleAudioEnded = () => {
    if (audioRef.current) {
      if (repeatSongState) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  };

  return (
    music.length >= 1 && (
      <div className="fixed bottom-0 z-[9995] bg-[#1f1f1f] right-0 lg:left-[250px] xl:left-[300px] left-0 p-3 flex items-center justify-start">
        <div className="flex items-center md:flex-row flex-col justify-between gap-4 w-full">
          <div className="flex gap-2 items-center justify-center">
            <div className="w-[50px] h-[50px] relative">
              <Image
                src={music && music[0].songImg}
                fill
                alt="Avatar"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex items-start justify-start gap-1 flex-col">
              <p className="text-md text-white font-bold">{`Somebody’s Pleasure`}</p>
              <span className="text-[#5E6866] text-sm">{`Aziz Hedra • 3:44`}</span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center gap-5">
              <span className="cursor-pointer">
                <ShuffleIcon />
              </span>
              <span className="cursor-pointer">
                <PrevSongIcon />
              </span>
              <div
                className="bg-gradient-to-r from-[#0cdee4] to-[#b100fe] rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={togglePlay}
              >
                {isPlaying ? <PauseSongIcon /> : <PlayAudioIcon />}
              </div>
              <span className="cursor-pointer">
                <NextSongIcon />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setRepeatSongState(!repeatSongState)}
              >
                {repeatSongState ? <RepeatOneSongIcon /> : <RepeatSongIcon />}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="text-white text-sm">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                className="xl:w-[500px] lg:w-[300px] w-[260px] md:w-[350px]"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                onInput={handleTimeUpdate}
              />
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
            <audio
              ref={audioRef}
              src="/audios/free2.mp3"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => {
                if (e.currentTarget.src) {
                  setDuration(Math.floor(e.currentTarget.duration));
                }
              }}
            />
          </div>
          <div className="items-center justify-center gap-3 hidden xl:flex">
            <HeartIcon />
            <div
              className="flex items-center justify-center gap-2"
              id="volumn control"
            >
              <VolumeIcon />
              <input
                type="range"
                className="w-[100px]"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <AddPlayListsIcon />
          </div>
        </div>
      </div>
    )
  );
};
