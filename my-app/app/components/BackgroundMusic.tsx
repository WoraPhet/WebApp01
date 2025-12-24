"use client";

import { useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

const playlist = [
  {
    title: "Mariah Carey - All I Want For Christmas Is You",
    src: "/music/Mariah Carey - All I Want For Christmas Is You.mp3",
  },
  {
    title: "Mariah Carey - Santa Claus Is Comin' to Town",
    src: "/music/Mariah Carey - Santa Claus Is Comin' to Town.mp3",
  },
];

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(0.05);

  /* เล่นเพลงถัดไปอัตโนมัติ */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      setCurrent((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  /* เปลี่ยนเพลง + auto play ถ้ายังอยู่ในโหมด playing */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = playlist[current].src;
    audio.load();

    if (playing) {
      const playWhenReady = () => {
        audio.play().catch(() => {});
        audio.removeEventListener("canplay", playWhenReady);
      };

      audio.addEventListener("canplay", playWhenReady);
    }
  }, [current, playing]);

  /* คุม play / pause + volume */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (playing) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [playing, volume]);

  return (
    <>
      <audio ref={audioRef} />

      {/* Music Control */}
      <div
        className="
          fixed z-50
          left-1/2 -translate-x-1/2
          bottom-[calc(env(safe-area-inset-bottom)+16px)]
          sm:left-auto sm:right-10 sm:translate-x-0
          sm:bottom-6
          flex flex-col items-center sm:items-end gap-2
        "
      >
        {/* Song title */}
        <div className=" text-emerald-900/70 sm:text-xs sm:text-black/70 max-w-55 text-wrap text-center sm:text-right">
          🎶 {playlist[current].title}
        </div>

        <div
          className="
            flex items-center gap-4
            rounded-full
            bg-white/80 sm:bg-black/70
            px-5 py-3
            backdrop-blur
            shadow-lg sm:shadow-none
          "
        >
          {/* Play / Pause */}
          <button
            onClick={() => setPlaying((p) => !p)}
            className="text-emerald-800 sm:text-white hover:scale-110 transition"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <PauseIcon className="h-8 sm:h-6 w-8 sm:w-6" />
            ) : (
              <PlayIcon className="h-8 sm:h-6 w-8 sm:w-6" />
            )}
          </button>

          {/* Volume (desktop only) */}
          <div className="hidden sm:flex items-center gap-2">
            <SpeakerWaveIcon className="h-5 w-5 text-white/70" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
