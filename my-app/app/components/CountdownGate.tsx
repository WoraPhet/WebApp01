"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type CountdownGateProps = {
  target: string; // ISO date string
  href: string;
  label?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();

  const total = Math.max(diff, 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function CountdownGate({
  target,
  href,
  label = "Open 🎄",
}: CountdownGateProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(target);

    const tick = () => {
      const diff = targetDate.getTime() - Date.now();

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft(getTimeLeft(targetDate));
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [target]);

  if (expired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href={href}
          className="
            inline-block
            rounded-3xl
            bg-white
            px-6 py-3
            text-red-500
            font-semibold
            shadow-lg
            hover:bg-gray-100
            hover:scale-105
            transition
          "
        >
          {label}
        </Link>
      </motion.div>
    );
  }

  if (!timeLeft) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-2 text-[#4cb5e8]"
    >
      <p className="text-sm tracking-wide">Counting down…</p>

      <div className="flex justify-center gap-3 text-lg font-semibold">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Min" />
        <TimeBox value={timeLeft.seconds} label="Sec" />
      </div>
    </motion.div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/70 rounded-xl px-3 py-2 shadow">
      <span className="text-xl">{value}</span>
      <span className="text-[10px] uppercase tracking-wide">{label}</span>
    </div>
  );
}
