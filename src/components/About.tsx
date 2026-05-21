"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers3,
  Radio,
  Bot,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";

const FACETS = [
  {
    icon: Layers3,
    title: "End-to-end systems",
    body: "From requirements and architecture to simulation, integration, testing, and deployment.",
  },
  {
    icon: Cpu,
    title: "Embedded control",
    body: "Motor drivers, Modbus communication, closed-loop control, fault handling, and hardware-aware software.",
  },
  {
    icon: Radio,
    title: "Simulation & validation",
    body: "ROS 2/Gazebo workflows, collision checking, motion behavior, path planning, and risk reduction before hardware tests.",
  },
  {
    icon: Bot,
    title: "CAD-aware robotics",
    body: "URDF/SDF models with visual, collision, and kinematic properties, supported by SolidWorks fundamentals.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="ABOUT"
          title={
            <>
              Robotics systems, engineered like products —{" "}
              <span className="text-white/55">not isolated scripts.</span>
            </>
          }
          description="Jossue builds end-to-end robotics and embedded systems with a product-engineering mindset: from simulation and CAD-aware models to controls, sensor integration, validation, and real hardware deployment."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <GlassPanel intensity="strong" className="h-full p-8 sm:p-10">
              <p className="text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
                I work at the intersection of robotics, embedded control, and
                system validation: <span className="text-white">ROS 2</span>,
                C/C++, motor drivers, sensor integration, simulation, path
                planning, NMPC control, and CAD-informed robot models.
              </p>
              <div className="hairline my-8" />
              <p className="text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
                The goal is always the same: understand how a system is
                designed, built, tested, and operated — then turn requirements
                into prototypes that are coherent, repeatable, and ready for
                real hardware.
              </p>
            </GlassPanel>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
            {FACETS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.1 + i * 0.08,
                }}
              >
                <GlassPanel
                  interactive
                  intensity="subtle"
                  className="h-full p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                      <f.icon className="size-4 text-white/85" />
                    </span>
                    <h3 className="text-sm font-semibold text-white/95">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {f.body}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
