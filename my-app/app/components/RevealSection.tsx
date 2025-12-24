"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function RevealSection({
  children,
  className = "",
}: RevealSectionProps) {
  return (
    <motion.section
      className={`
        snap-start min-h-svh sm:min-h-10/12
        flex items-center justify-center
        px-4 sm:px-6
        ${className}
      `}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="w-full max-w-xs sm:max-w-md mx-auto text-center space-y-6">
        {children}
      </div>
    </motion.section>
  );
}
