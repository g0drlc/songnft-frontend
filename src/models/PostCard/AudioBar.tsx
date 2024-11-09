"use client";
import MintModal from "@/src/components/modal/MintModal";
/* eslint-disable @next/next/no-img-element */
import {
  MiniPlayIcon,
  PauseSongIcon,
  PlayAudioIcon,
} from "../../components/Svglist";
import { GetPageContext } from "../../contexts/PageContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export const AudioBar = (props: {
  songTitle: string;
  songImg: string;
  playCount: number;
  songArtist: string;
  songUrl: string;
}) => {
  const { setMusicFunc } = useContext(GetPageContext);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);

  const [othersStopState, setOthersStopState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
        setIsPlaying(false);
        stopAllSound();
        setMusicFunc(
          props.songImg,
          props.songTitle,
          props.songArtist,
          props.songUrl
        );

        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    setCurrentlyPlaying(props.songTitle);
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Reset the state when the audio ends
  useEffect(() => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
      const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false);
      };
      audioRef.current.addEventListener("ended", handleEnded);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [audioRef, audioRef.current]);

  const handleOpenMintModal = () => {
    console.log("mint1", isMintModalOpen);
    setIsMintModalOpen(true);
    console.log("mint", isMintModalOpen);
  };

  const handleCloseMintModal = () => {
    setIsMintModalOpen(false);
    console.log();
  };

  return (
    <div className="flex justify-start items-start gap-4 bg-[#08090B] p-3 rounded-xl w-full">
      <div className="relative w-[60px] md:w-[120px] h-[50px] md:h-[110px]">
        <Image
          src={props.songImg}
          fill
          alt="Music Avatar"
          className="rounded-xl object-cover"
        />
      </div>
      <div className="relative flex flex-col justify-start items-start gap-1 w-full">
        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-lg text-white">{props.songTitle}</p>
          <p className="flex justify-center items-center gap-1 cursor-pointer">
            <MiniPlayIcon />
            <span className="text-[#939393] text-sm">{props.playCount}</span>
          </p>
        </div>
        <p className="text-[#939393] text-sm">{props.songArtist}</p>
        <div className="flex md:flex-row flex-col justify-start items-center gap-3 mt-6 w-full">
          <div className="flex justify-start items-center gap-2 w-full">
            <span className="text-sm text-white">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              className="w-full transition-all duration-300"
              min={0}
              max={duration.toString()}
              value={currentTime}
              onChange={handleSeek}
              onInput={handleTimeUpdate}
            />
            <audio
              ref={audioRef}
              src={props.songUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => {
                if (e.currentTarget.src) {
                  setDuration(Math.floor(e.currentTarget.duration));
                }
              }}
            />
            <div
              className="bg-[#272727] p-2 rounded-full cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? <PauseSongIcon /> : <PlayAudioIcon />}
            </div>
          </div>
          <button className="border-[#0cdee4] border-[1px] hover:bg-[#242424] px-4 py-2 rounded-full w-full md:w-auto font-bold text-sm text-white transition-all duration-300">
            {"Collect"}
          </button>
          <button
            className="border-[#0cdee4] border-[1px] hover:bg-[#242424] px-4 py-2 rounded-full w-full md:w-auto font-bold text-sm text-white transition-all duration-300"
            onClick={handleOpenMintModal}
          >
            {"Mint"}
          </button>
        </div>
      </div>
      <MintModal
        isOpen={isMintModalOpen}
        onRequestClose={handleCloseMintModal}
        data={props}
      />
    </div>
  );
};
