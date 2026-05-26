"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";

/* Capacidades como keywords editoriales, no como tarjetas con iconos. */
const CAPABILITIES = [
  "ROS 2",
  "Embedded control",
  "Motion planning",
  "Simulation",
  "CAD-aware models",
  "Hardware deployment",
];

export function About() {
  return (
    <section id="about" className="section-pad relative" aria-label="About">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        {/* Header mínimo y sutil — reemplaza al SectionHeader.
            Solo un eyebrow pequeño con el punto cian de acento. */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/60"
        >
          <span className="size-1 rounded-full bg-accent/70" />
          About
        </motion.span>

        {/* Declaración principal con text reveal on scroll (GSAP).
            Cada palabra pasa de gris a blanco a medida que haces scroll. */}
        <ScrollReveal
          as="h2"
          baseColor="rgba(160,160,168,0.25)"
          revealColor="rgba(232,232,234,0.95)"
          start="top 90%"
          end="bottom 55%"
          className="max-w-5xl text-balance text-3xl font-medium leading-[1.25] tracking-tight sm:text-4xl lg:text-[2.8rem] lg:leading-[1.18]"
        >
          I build robotics systems end-to-end. From simulation and CAD-aware
          models to embedded control, sensor integration, and real hardware
          deployment.
        </ScrollReveal>

        {/* Línea de apoyo breve. */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-3xl text-pretty text-lg leading-relaxed text-muted/70"
        >
          A product-engineering mindset applied to robotics: requirements become
          prototypes that are coherent, repeatable, and ready for the field.
        </motion.p>

        {/* Capacidades como keywords inline con puntos cian. */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.li
              key={cap}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.25 + i * 0.05,
              }}
              className="flex items-center gap-x-5 text-base font-medium text-fg/75"
            >
              <span aria-hidden className="size-1 rounded-full bg-accent/60" />
              {cap}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
