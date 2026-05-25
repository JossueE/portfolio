"use client";

import * as React from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Email", href: "mailto:kadavetar10@gmail.com" },
  { label: "GitHub", href: "https://github.com/JossueE" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jossuee" },
];

export function ContactFooter() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden"
    >
      {/* ── Imagen de fondo full-bleed ───────────────────────────────
          Reemplaza /images/contact-bg.webp por tu imagen real. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable={false}
          className="size-full select-none object-cover object-center"
        />
      </div>

      {/* Overlay sutil solo para legibilidad — sin glows ni adornos */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/65 to-black/30"
      />

      {/* ── CONTENIDO ────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-16 pt-32 sm:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45"
        >
          <span className="size-1 rounded-full bg-accent/80" />
          Contact
        </motion.span>

        {/* Título grande, eco del hero */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.02]"
        >
          Let&apos;s build something{" "}
          <span className="text-white/35">autonomous.</span>
        </motion.h2>

        {/* Links de contacto como tipografía pura, sin cajas ni iconos */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="mt-14 flex flex-col"
        >
          {LINKS.map((l) => (
            <motion.li
              key={l.label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 last:border-b"
            >
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-6 py-5 sm:py-6"
              >
                <span className="text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-accent sm:text-3xl">
                  {l.label}
                </span>
                {/* Flecha que se desliza en hover */}
                <span className="translate-x-0 text-xl text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-2xl">
                  &rarr;
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* ── FOOTER mínimo al fondo ────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-5xl px-6 pb-10 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-white/40 sm:flex-row sm:items-center">
          <span className="font-medium tracking-tight text-white/70">
            Jossue Espinoza
          </span>
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} | Robotics &amp; Autonomous Systems
          </p>
        </div>
      </div>
    </section>
  );
}