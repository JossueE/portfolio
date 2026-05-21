"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Radar,
  Eye,
  Route,
  GitBranch,
  MessageSquare,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";

type Stage = {
  title: string;
  icon: LucideIcon;
  body: string;
};

const STAGES: Stage[] = [
  {
    title: "Simulation",
    icon: FlaskConical,
    body: "Build the world before the robot ships.",
  },
  {
    title: "Sensors",
    icon: Radar,
    body: "LiDAR, IMU, cameras streaming through ROS 2.",
  },
  {
    title: "Perception",
    icon: Eye,
    body: "Filtering, clustering, mapping, SLAM.",
  },
  {
    title: "Planning",
    icon: Route,
    body: "Occupancy grids, A*, Lanelet2 reasoning.",
  },
  {
    title: "Control",
    icon: GitBranch,
    body: "NMPC controllers with CasADi and IPOPT.",
  },
  {
    title: "Human–Robot Interaction",
    icon: MessageSquare,
    body: "Local LLM voice pipelines and feedback.",
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="Identity"
          title={
            <>
              From simulation to autonomy —{" "}
              <span className="text-white/55">end to end.</span>
            </>
          }
          description="Robotic systems aren't a single script. They're a coherent pipeline. This is how I think about every project."
        />

        <GlassPanel className="p-4 sm:p-6">
          <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {STAGES.map((s, i) => (
              <React.Fragment key={s.title}>
                <motion.li
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  className="group relative flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Stage {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                      <s.icon className="size-4 text-white/90" />
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    {s.body}
                  </p>
                </motion.li>
                {i < STAGES.length - 1 && (
                  <li
                    aria-hidden
                    className="flex items-center justify-center text-white/25"
                  >
                    <ChevronRight className="hidden size-4 md:block" />
                    <span className="block h-px w-full bg-gradient-to-b from-white/15 to-transparent md:hidden" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </GlassPanel>
      </div>
    </section>
  );
}
