"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTree, FaWater, FaCloudRain } from "react-icons/fa";

const themes = [
  {
    name: "Forest",
    icon: <FaTree />,
    sound: "/forest.mp3",
    background:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Beach",
    icon: <FaWater />,
    sound: "/beach.mp3",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Rain",
    icon: <FaCloudRain />,
    sound: "/rain.mp3",
    background:
      "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1740&q=80",
  },
];

export default function RelaxApp() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = themes[current].sound;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [current, isPlaying]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center transition-all duration-500 flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${themes[current].background})`,
      }}
    >
      <div className="text-white text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
          Relax & Breathe
        </h1>
        <p className="text-lg md:text-xl mt-4 drop-shadow-sm">
          Let the nature calm your mind 🌿
        </p>
      </div>

      {/* Breathing Circle */}
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-48 h-48 bg-white/30 rounded-full backdrop-blur-md border-4 border-white shadow-2xl"
      />

      {/* Controls */}
      <div className="mt-10 flex gap-4 flex-wrap justify-center text-white">
        {themes.map((theme, i) => (
          <button
            key={theme.name}
            onClick={() => setCurrent(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition ${
              i === current
                ? "bg-white text-black font-bold"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {theme.icon}
            {theme.name}
          </button>
        ))}
        <button
          onClick={toggleSound}
          className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md"
        >
          {isPlaying ? "Pause Sound" : "Play Sound"}
        </button>
      </div>

      <audio ref={audioRef} loop />
    </div>
  );
}
