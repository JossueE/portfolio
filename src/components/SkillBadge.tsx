"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  label: string;
  className?: string;
  delay?: number;
};

export function SkillBadge({ label, className, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className={cn(
        "chip transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08]",
        className
      )}
    >
      {label}
    </motion.span>
  );
}
