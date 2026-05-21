"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Cpu, Users } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";
import octopyImage from "../../docs/images/Octopy.jpeg";
import vanttecImage from "../../docs/images/vanttec.png";
import hummskyImage from "../../docs/images/hummsky.jpeg";

type Experience = {
  company: string;
  role: string;
  period: string;
  stack: string;
  image: StaticImageData;
  imageAlt: string;
  points: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "Octopy",
    role: "Robotics Engineer",
    period: "Aug 2025 - Present",
    stack: "ROS 2 / C++ / Python",
    image: octopyImage,
    imageAlt: "Octopy robotics engineering workspace",
    points: [
      "Developed a ROS 2 motor driver for discontinued ZLAC motor controllers over Modbus using datasheet-only documentation.",
      "Enabled closed-loop velocity, position, and torque control with fault handling for deployable robot hardware.",
      "Led a compute architecture migration that reduced per-unit hardware cost by 75% while improving energy efficiency by 12%.",
      "Supported Qualcomm integration discussions, feasibility alignment, and partner-facing technical coordination.",
    ],
  },
  {
    company: "VantTec",
    role: "Software Developer",
    period: "Jan 2026 - Present",
    stack: "ROS 2 / C++",
    image: vanttecImage,
    imageAlt: "VantTec autonomous systems team",
    points: [
      "Developed an NMPC-based control system for trajectory tracking and autonomous navigation.",
      "Worked with kinematic constraints, validation goals, and simulation-based testing before hardware deployment.",
      "Collaborated across domains to align software development with system-level autonomy requirements.",
    ],
  },
  {
    company: "Hummsky Agrosolutions",
    role: "Embedded Systems Developer",
    period: "Aug 2024 - Dec 2024",
    stack: "C / C++",
    image: hummskyImage,
    imageAlt: "Hummsky Agrosolutions embedded automation project",
    points: [
      "Translated greenhouse system needs into a touchscreen HMI solution.",
      "Selected a microcontroller-based architecture to balance cost, implementation feasibility, and product constraints.",
      "Supported embedded development for environmental monitoring and automation-oriented control.",
    ],
  },
];

export function ProfessionalExperience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="Experience"
          title="Professional experience"
          description="Hands-on engineering work across robotics, embedded control, validation, partner-facing execution, and deployable systems."
        />

        <div className="grid grid-cols-1 gap-5">
          {EXPERIENCES.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: index * 0.08,
              }}
            >
              <GlassPanel interactive className="overflow-hidden">
                <div className="grid md:grid-cols-[280px_1fr]">
                  <div className="relative min-h-[220px] overflow-hidden border-b border-white/10 bg-white/[0.03] md:min-h-full md:border-b-0 md:border-r">
                    <Image
                      src={experience.image}
                      alt={experience.imageAlt}
                      fill
                      sizes="(min-width: 768px) 280px, 100vw"
                      className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.04]"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </div>

                  <div className="flex flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip text-[10px] uppercase tracking-[0.18em]">
                          {experience.company}
                        </span>
                        <span className="chip text-[10px] uppercase tracking-[0.18em] text-white/60">
                          {experience.stack}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        {experience.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/55">
                      <Calendar className="size-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 gap-3 text-sm leading-relaxed text-white/68 lg:grid-cols-2">
                    {experience.points.map((point, pointIndex) => {
                      const icons = [Cpu, Briefcase, Users, Cpu];
                      const Icon = icons[pointIndex % icons.length];

                      return (
                        <li
                          key={point}
                          className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                        >
                          <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                            <Icon className="size-3.5 text-white/75" />
                          </span>
                          <span>{point}</span>
                        </li>
                      );
                    })}
                  </ul>
                  </div>
                </div>
              </GlassPanel>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
