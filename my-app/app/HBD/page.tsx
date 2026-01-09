"use client";

import { Caveat, Sriracha } from "next/font/google";
import BackgroundMusic from "@/app/components/BackgroundMusic";
import RevealSection from "@/app/components/RevealSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Particle = {
  id: number;
  x: number;
  emoji: string;
};

const EMOJIS = [
  "🐷",
  "🐢",
  "🎂",
  "🍰",
  "🎈",
  "🎉",
  "🎊",
  "🎁",
  "🥳",
  "🧁",
  "🕯️",
  "🌈",
];

const loveMessages = [
  "🎂Happy 23rd Birthday!",
  "🎁for Zeen, my beloved.",
  "Happy Birthday!, May all your wishes come true.🎉❤️",
  "🎊ขอให้ซีนมีความสุขมากๆนะ🎊",
  "🐢ขอให้ซีนมีสุขภาพแข็งแรง🐢",
  "🥳ขอให้มีแต่เรื่องราวดีๆเข้ามาในชีวิต🥳",
  "💵ขอให้มีเงินเยอะๆเลย💵",
  "🌈ขอให้เป็นปีที่ไม่เหนื่อยงับ🌈",
  "🐷💖🐢",
];

const Caveaty = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Srirachaa = Sriracha({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HBD() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);

  const randomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const spawnParticles = () => {
    const count = 9; // จำนวน emoji ต่อคลิก

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
      <BackgroundMusic />
      <main
        className={`
    relative h-screen overflow-y-scroll snap-y snap-mandatory
    bg-[#5b3758] text-[#f3e8ff]
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
              <span className="absolute inset-0 text-fuchsia-400 blur-sm opacity-60">
                🎂Happy 23rd Birthday!
              </span>
              <span className="relative text-[#fef3c7]">
                🎂Happy 23rd Birthday!
              </span>

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
            🎂🍰🎈🎉🎊🎁🥳🧁🕯️
          </p>
        </RevealSection>
        <RevealSection>
          <p className={`text-2xl leading-relaxed ${Srirachaa.className}`}>
            🎂สุขสันต์วันเกิดนะครับเบบี๋ ปีนี้อายุ23ปีแล้ว โตขึ้นอีกปีแล้วนะ
            ขอให้เจอสิ่งแต่สิ่งดีๆ สุขภาพร่างกายแข็งแรง มีเงินทองเข้ามาเยอะๆเลย
            เพชรคอยเอาใจช่วยอยู่ จะเป็นกำลังใจให้นะ จะดื้อๆให้น้อยลงด้วย
            ปีนี้ก็ขอให้พบเจอแต่เรื่องราวดีๆครับ รอให้ของขวัญชุดใหญ่อยู่นะ🥳🎁
          </p>
        </RevealSection>
        <RevealSection>
          <p className={`text-2xl leading-relaxed ${Srirachaa.className}`}>
            🥰วันนี้ซีนก็ยังน่ารักเหมือนเคย เพชรรักซีนที่สุดเลยครับ💗
          </p>
        </RevealSection>
        <RevealSection>
          <div className="flex justify-center items-center w-full py-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-fuchsia-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <Image
                src="/assets/HBD2026_Zeen.gif"
                alt="Birthday Gift"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-2xl border-2 border-white/20"
                unoptimized
              />
            </div>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
