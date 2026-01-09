"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CountdownGate from "./components/CountdownGate";

const gifs = [
  "/assets/sousou-no-frieren-flower-magic2.gif",
  "/assets/cute-hamtaro.gif",
  "/assets/flowers-bloom.gif",
  "/assets/hi-flower-hello-hi-say-hi-flower.gif",
  "/assets/orange-yellow.gif",
  "/assets/peaceful-flower.gif",
  "/assets/rose-anime.gif",
];

const messages = [
  {
    p: "วันนี้ซีนก็น่ารักมากเหมือนเดิมเลยครับ",
    z: "เพชรน่ารักมากๆอยากให้เพชรน่ารักแบบนี้ทุกวัน",
  },
  {
    p: "วันนี้ซีนก็ยังน่ารักเหมือนเดิม🥰",
    z: "เพชรใส่ใจมากเลย ดีใจที่ตื่นมาก็เจอข้อความเพชรเลย เช้านี้สดใสแล้ว❤️",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HomePage() {
  // 🔒 deterministic state (SSR-safe)
  const [shuffledMessages, setShuffledMessages] = useState(messages);
  const [messageIndex, setMessageIndex] = useState(0);

  const [currentGif, setCurrentGif] = useState(gifs[0]);
  const [gifKey, setGifKey] = useState(0);

  // 🌸 GIF rotation (external system)
  useEffect(() => {
    const id = setInterval(() => {
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      setCurrentGif(randomGif);
      setGifKey((prev) => prev + 1);
    }, 5160);

    return () => clearInterval(id);
  }, []);

  // 💬 Message rotation + shuffle (external system)
  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((prev) => {
        const next = prev + 1;

        // ครบรอบ → shuffle ใหม่
        if (next >= shuffledMessages.length) {
          setShuffledMessages(shuffleArray(messages));
          return 0;
        }

        return next;
      });
    }, 16500);

    return () => clearInterval(id);
  }, [shuffledMessages.length]);

  const { p, z } = shuffledMessages[messageIndex];

  return (
    <div className="h-screen w-full flex flex-col justify-start items-center bg-cyan-100">
      <div className="relative my-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-[#4cb5e8] absolute inset-0 translate-x-1 translate-y-1"
        >
          For Zeen, My Beloved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0.2, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-[#ffd0e1] relative"
        >
          For Zeen, My Beloved.
        </motion.p>
      </div>

      <CountdownGate
        target="2026-01-10T00:00:00+07:00"
        href="/HBD"
        label="🎂Happy 23rd Birthday!"
      />

      {/* <CountdownGate
        target="2025-12-25T00:00:00+07:00"
        href="/Christmas"
        label="Merry Christmas 🎄"
      /> */}

      <div className="relative w-full h-64 md:h-160 overflow-hidden mt-2 mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={gifKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9 }}
            className="absolute w-full h-full"
          >
            <Image
              alt="flower gif"
              src={currentGif}
              width={1000}
              height={1000}
              unoptimized
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center text-lg">
        <motion.p
          key={`P-${messageIndex}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[#4cb5e8] text-pretty text-center"
        >
          P: {p}
        </motion.p>

        <motion.p
          key={`Z-${messageIndex}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-[#FF90BB] text-pretty text-center"
        >
          Z: {z}
        </motion.p>
      </div>
    </div>
  );
}
