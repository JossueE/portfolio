"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SplitText from "../animations/SplitText";

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
    imageAlt: "Octopy",
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
    imageAlt: "VantTec",
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
    imageAlt: "Hummsky Agrosolutions",
    points: [
      "Translated greenhouse system needs into a touchscreen HMI solution.",
      "Selected a microcontroller-based architecture to balance cost, implementation feasibility, and product constraints.",
      "Supported embedded development for environmental monitoring and automation-oriented control.",
    ],
  },
];

function ExperienceBlock({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const alignRight = index % 2 === 1; // alterna el lado del contenido

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate flex min-h-[62svh] w-full items-end overflow-hidden"
    >
      {/* ── Imagen de fondo full-bleed, con leve zoom de entrada ─────── */}
      <motion.div
        aria-hidden
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={index === 0}
        />
      </motion.div>

      {/* Overlay para legibilidad — degradado direccional según el lado */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/20 ${
          alignRight
            ? "sm:bg-gradient-to-l sm:from-black sm:via-black/60 sm:to-transparent"
            : "sm:bg-gradient-to-r sm:from-black sm:via-black/60 sm:to-transparent"
        }`}
      />

      {/* Hairline cian sutil en el borde superior de cada bloque */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      {/* ── Contenido ───────────────────────────────────────────────── */}
      <div className="w-full px-6 pb-14 pt-24 sm:px-10 sm:pb-16 lg:px-16">
        <div
          className={`flex max-w-2xl flex-col gap-6 ${
            alignRight ? "sm:ml-auto sm:items-end sm:text-right" : ""
          }`}
        >
          {/* Encabezado */}
          <div className="flex flex-col gap-3">
            {/* Empresa · periodo con punto cian de acento */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.18em] text-white/60 ${
                alignRight ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span className="size-1.5 rounded-full bg-accent/80" />
              {experience.company}{"  "}
              <span className="text-white/35">{experience.period}</span>
            </motion.span>

            {/* Rol con SplitText (reveal importante). splitType "words, chars"
                evita que palabras largas como "Developer" se partan a la mitad. */}
            <SplitText
              tag="h3"
              text={experience.role}
              delay={35}
              duration={0.8}
              ease="power3.out"
              splitType="words, chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="-60px"
              textAlign={alignRight ? "right" : "left"}
              className="block text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.05]"
            />

            {/* Stack con puntos cian de separación */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/55 ${
                alignRight ? "sm:justify-end" : ""
              }`}
            >
              {experience.stack.map((tech, i) => (
                <React.Fragment key={tech}>
                  {i > 0 && (
                    <span aria-hidden className="size-1 rounded-full bg-accent/50" />
                  )}
                  {tech}
                </React.Fragment>
              ))}
            </motion.span>
          </div>

          {/* Logros con animación de entrada escalonada */}
          <ul className={`flex flex-col gap-3.5 ${alignRight ? "sm:items-end" : ""}`}>
            {experience.points.map((point, pointIndex) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.35 + pointIndex * 0.1,
                }}
                className={`flex max-w-xl gap-3 text-sm leading-relaxed text-white/70 sm:text-base ${
                  alignRight ? "sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent/50"
                />
                <span className="text-pretty">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function ProfessionalExperience() {
  return (
    <section
      id="experience"
      className="relative w-full"
      aria-label="Professional Experience"
    >
      {/* Header con SplitText */}
      <div className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/50"
          >
            <span className="size-1 rounded-full bg-accent/70" />
            Experience
          </motion.span>

          <SplitText
            tag="h2"
            text="Where I've built things."
            delay={30}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="-40px"
            textAlign="left"
            className="block max-w-3xl text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl lg:leading-[1.05]"
          />
        </div>
      </div>

      {/* Bloques de experiencia full-bleed */}
      <div className="flex flex-col">
        {EXPERIENCES.map((experience, index) => (
          <ExperienceBlock
            key={experience.company}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}