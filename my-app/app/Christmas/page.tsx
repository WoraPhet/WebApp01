"use client";

import { Caveat, Sriracha } from "next/font/google";
import BackgroundMusic from "@/app/components/BackgroundMusic";
import dynamic from "next/dynamic";
import RevealSection from "@/app/components/RevealSection";
import SideLight from "../components/SideLight";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  emoji: string;
};

const EMOJIS = ["🐷", "🐢", "💖", "🎅", "🎄", "❄️", "☃️", "🎁", "🦌"];

const loveMessages = [
  "❄️for Zeen, my beloved.",
  "Merry Christmas, My Sweetheart🎄❤️",
  "รักซีนที่สุดเยยนะ💖",
  "ขอให้ซีนมีความสุขงับ😍",
  "เป็นของขวัญสำหรับคนเก่งนะ🎁",
  "ชอบอ่ะจิ🥰",
  "ซีนน่ารักน้าา",
  "🐷💖🐢",
];

const Snow = dynamic(() => import("@/app/components/Snow"), {
  ssr: false,
});

const Caveaty = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Srirachaa = Sriracha({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Christmas() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);

  const randomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const spawnParticles = () => {
    const count = 6; // จำนวน emoji ต่อคลิก

    const newParticles: Particle[] = Array.from({ length: count }).map(
      (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 400 - 200, // กระจายซ้ายขวา
        emoji: randomEmoji(),
      })
    );

    setParticles((prev) => [...prev, ...newParticles]);

    // ลบหลัง animation จบ
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((n) => n.id === p.id))
      );
    }, 1000);
  };

  return (
    <>
      <SideLight />
      <Snow />
      <BackgroundMusic />
      <main
        className={`
    relative h-screen overflow-y-scroll snap-y snap-mandatory
    bg-[#73ba9b] text-[#d5f2e3]
    px-4 sm:px-6
    pt-[env(safe-area-inset-top)] 
    pb-[env(safe-area-inset-bottom)]
    ${Caveaty.className}
  `}
      >
        <RevealSection>
          <div
            onClick={() => {
              setClickCount((c) => c + 1);
              spawnParticles();
            }}
            className="
      relative
      inline-flex
      flex-col
      items-center
      font-bold
      text-center
      text-5xl sm:text-7xl lg:text-8xl
      cursor-pointer
      select-none
    "
          >
            {/* ===== Title ===== */}
            <div className="relative">
              <span className="absolute inset-0 text-red-600 blur-sm opacity-50">
                Merry Christmas
              </span>
              <span className="relative text-[#f5e6b3]">Merry Christmas</span>

              {/* 🎉 Emoji Burst Layer */}
              <AnimatePresence>
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ opacity: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: -70,
                      x: p.x,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, y: -110 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="
        absolute
        left-1/2
        top-0
        text-xl sm:text-2xl
        pointer-events-none
        select-none
      "
                  >
                    {p.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* ===== Overlay message ===== */}
            <AnimatePresence mode="wait">
              {clickCount > 0 && (
                <motion.div
                  key={clickCount}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`
            absolute
            top-full
            mt-03 sm:mt-5
            z-10
            text-lg sm:text-2xl
            font-normal
            text-[#ffe6f0]
            whitespace-nowrap
            pointer-events-none
            drop-shadow-[0_2px_6px_rgba(255,200,220,0.6)]
            ${Srirachaa.className}
          `}
                >
                  {loveMessages[clickCount % loveMessages.length]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealSection>

        <RevealSection>
          <p className={`text-4xl leading-relaxed ${Srirachaa.className}`}>
            🎄🎅🏻🦌☃️❄️☕🧣🧺🧸
          </p>
        </RevealSection>
        <RevealSection>
          <p className={`text-2xl leading-relaxed ${Srirachaa.className}`}>
            🎄เย่ะะ สุขสันต์วันคริสต์มาสนะงับเบบี๋ ดีใจมากๆเยยน้า
            อยู่ด้วยกัยทุกเทศกาลเยย ฟินจังง ปีหน้าก็จะอยู่ด้วยกันอีกน้าาา นะๆๆๆ
            แหะๆๆ ปีนี้ก็เก่งมากเลยนะเบบี๋ เพชรจะคอยเป็นกำลังใจให้ซีนนะ
            ยิ้มหวานเยอะๆนะะ ขอให้เบบี๋มีความสุขงับ🥰
          </p>
        </RevealSection>
        <RevealSection>
          <p className={`text-2xl leading-relaxed ${Srirachaa.className}`}>
            🥰วันนี้เบบี๋ก็ยังน่ารักเหมือนเคย เค้ารักเบบี๋ที่สุดเยยงับบ💗
          </p>
        </RevealSection>
      </main>
    </>
  );
}
