"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  Github,
  Mail,
  Sparkles,
  CircuitBoard,
} from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";
import { GlassPanel } from "@/components/GlassPanel";

const STATS = [
  {
    label: "Programming",
    value: "C++ · C · Python · OOP · Data Structures and Algorithms",
  },
  {
    label: "Automation & Control",
    value: "Modbus · HMI · CAD · Motor control · Sensor integration · Validation",
  },
  {
    label: "Embedded/Robotics",
    value: "RTOS · STM32 · AVR · ROS 2 · FPGA · Linux · Git",
  },
  { label: "Languages", value: "Spanish native · English professional" },
  {
    label: "Interests",
    value: "Autonomous Mobility · Product Design · Embedded Solutions · Robotics",
  },
];

export function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useSpring(
    useTransform(scrollY, [0, 220], [1, 0]),
    { stiffness: 90, damping: 24 }
  );

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] w-full items-center overflow-hidden px-6 pb-24 pt-36 sm:px-8 md:min-h-screen md:pt-44 lg:px-12"
    >
      <FloatingShapes />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="chip">
            <Sparkles className="size-3.5" />
            <span className="uppercase tracking-[0.2em] text-[10px] text-white/70">
              ROS 2 · C++ · Embedded Systems
            </span>
          </span>
          <span className="hidden text-xs text-white/40 sm:inline">
            Robotics, control, simulation, and local AI
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="display-title text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.98]"
          >
            Jossue Espinoza
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
          >
            <h2 className="text-pretty text-2xl font-medium text-white/90 sm:text-3xl md:text-4xl">
              Robotics &amp; Autonomous Systems Engineer
            </h2>
            <span className="hidden h-7 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-2 text-sm text-white/55">
              <CircuitBoard className="size-4" />
              <span>From prototype to deployment</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="max-w-2xl text-pretty text-lg text-white/65 sm:text-xl"
          >
            Building deployable robotics and embedded systems through{" "}
            <span className="text-white/90">ROS 2</span>, C++, motor control,
            simulation validation, and local AI interaction.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn-solid">
            View Projects
            <ArrowDownRight className="size-4" />
          </a>
          <a
            href="https://github.com/JossueE"
            target="_blank"
            rel="noreferrer"
            className="btn-glass"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a href="#contact" className="btn-glass">
            <Mail className="size-4" />
            Contact
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.55 }}
          className="mt-2"
        >
          <GlassPanel className="grid grid-cols-1 divide-y divide-white/10 p-1 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 px-6 py-5 text-left"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                  {s.label}
                </span>
                <span className="text-sm font-medium leading-relaxed text-white/95">
                  {s.value}
                </span>
              </div>
            ))}
          </GlassPanel>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-[13px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
