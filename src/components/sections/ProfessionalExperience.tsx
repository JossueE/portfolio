"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Cpu, Users } from "lucide-react";

type Experience = {
  company: string;
  role: string;
  period: string;
  stack: string[];
  image: string;
  imageAlt: string;
  points: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "Octopy",
    role: "Robotics Engineer",
    period: "Aug 2025 to Present",
    stack: ["ROS 2", "C++", "Python", "Modbus"],
    image: "/images/octopy.jpeg",
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
    period: "Jan 2026 to Present",
    stack: ["ROS 2", "C++", "NMPC"],
    image: "/images/vanttec.png",
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
    period: "Aug 2024 to Dec 2024",
    stack: ["C", "C++", "HMI"],
    image: "/images/hummsky.jpeg",
    imageAlt: "Hummsky Agrosolutions embedded automation project",
    points: [
      "Translated greenhouse system needs into a touchscreen HMI solution.",
      "Selected a microcontroller-based architecture to balance cost, implementation feasibility, and product constraints.",
      "Supported embedded development for environmental monitoring and automation-oriented control.",
    ],
  },
];

const POINT_ICONS = [Cpu, Briefcase, Users, Cpu];

export function ProfessionalExperience() {
  return (
    <section
      id="experience"
      className="section-pad relative overflow-hidden"
      aria-label="Professional Experience"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/60">
            <span className="size-1 rounded-full bg-accent/70" />
            Experience
          </span>

          <div className="flex max-w-3xl flex-col gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl lg:leading-[1.04]"
            >
              Where I&apos;ve built things.
            </motion.h2>
            <p className="text-pretty text-base leading-relaxed text-muted/70 sm:text-lg">
              Hands-on engineering work across robotics, embedded control,
              validation, partner-facing execution, and deployable systems.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5">
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      <div className="liquid-glass glass-edge overflow-hidden rounded-[1.75rem]">
        <div className="grid md:grid-cols-[280px_1fr]">
          <div className="relative min-h-[220px] overflow-hidden border-b border-edge/10 bg-surface/[0.03] md:min-h-full md:border-b-0 md:border-r md:border-edge/10">
            <Image
              src={experience.image}
              alt={experience.imageAlt}
              fill
              sizes="(min-width: 768px) 280px, 100vw"
              className="object-cover opacity-85"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium uppercase tracking-[0.14em] text-accent/70">
                    {experience.company}
                  </span>
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="chip text-[10px] uppercase tracking-[0.18em] text-muted/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
                  {experience.role}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted/65">
                <Calendar className="size-4" />
                <span>{experience.period}</span>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-3 text-sm leading-relaxed text-muted/75 lg:grid-cols-2">
              {experience.points.map((point, pointIndex) => {
                const Icon = POINT_ICONS[pointIndex % POINT_ICONS.length];

                return (
                  <li
                    key={point}
                    className="flex gap-3 rounded-2xl border border-edge/10 bg-surface/[0.025] p-4"
                  >
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-edge/10 bg-surface/[0.05]">
                      <Icon className="size-3.5 text-fg/75" />
                    </span>
                    <span>{point}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
