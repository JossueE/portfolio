"use client";

import * as React from "react";
import { motion } from "framer-motion";

const KEYWORDS = [
  { text: "ROS 2", x: "8%", y: "18%", size: "text-base", delay: 0 },
  { text: "Gazebo", x: "80%", y: "12%", size: "text-sm", delay: 0.4 },
  { text: "NMPC", x: "14%", y: "70%", size: "text-base", delay: 0.7 },
  { text: "SLAM", x: "72%", y: "62%", size: "text-sm", delay: 0.2 },
  { text: "LiDAR", x: "44%", y: "82%", size: "text-xs", delay: 1.0 },
  { text: "Local LLM", x: "62%", y: "26%", size: "text-sm", delay: 0.6 },
  { text: "Path Planning", x: "22%", y: "40%", size: "text-xs", delay: 0.9 },
  { text: "C++", x: "88%", y: "44%", size: "text-base", delay: 0.3 },
  { text: "Python", x: "6%", y: "52%", size: "text-sm", delay: 0.5 },
];

export function FloatingKeywords() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden"
    >
      {KEYWORDS.map((kw) => (
        <motion.span
          key={kw.text}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: [0, 0.5, 0.4, 0.55],
            y: [14, 0, -8, 0],
          }}
          transition={{
            duration: 8,
            delay: kw.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className={`absolute select-none font-mono tracking-[0.18em] uppercase text-white/40 ${kw.size}`}
          style={{ left: kw.x, top: kw.y }}
        >
          {kw.text}
        </motion.span>
      ))}
    </div>
  );
}
