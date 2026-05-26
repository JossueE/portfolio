"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";

/*
  Estructura de datos esperada (compatible con tu skillGroups actual):

  type SkillGroup = {
    id: string;
    title: string;
    description: string;
    icon?: ...;            // ya no se usa (diseño sin iconos), opcional
    skills: string[];      // funciona tal cual
    // — opcional, para la barra de nivel —
    // skills puede ser string[] O { name: string; level?: number }[]
  };

  Si quieres niveles, cambia skills a objetos { name, level } (level 0–100).
  Si dejas string[], simplemente no se muestran barras y se ven como keywords.
*/

type RawSkill = string | { name: string; level?: number };

function normalize(skill: RawSkill): { name: string; level?: number } {
  return typeof skill === "string" ? { name: skill } : skill;
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative" aria-label="Skills">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {/* Header mínimo, consistente con el resto de la página */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/60">
            <span className="size-1 rounded-full bg-accent/70" />
            Skills
          </span>
          <div className="flex max-w-3xl flex-col gap-5">
            <h2 className="text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl lg:leading-[1.04]">
              The stack behind the robots.{" "}
              <span className="text-muted/45">From kernel to LLM.</span>
            </h2>
          </div>
        </div>

        {/* Dominios como filas grandes, no tarjetas apretadas */}
        <div className="flex flex-col">
          {skillGroups.map((group, i) => {
            const skills = (group.skills as RawSkill[]).map(normalize);
            const isLast = i === skillGroups.length - 1;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className={`grid grid-cols-1 gap-6 py-10 lg:grid-cols-[280px_1fr] lg:gap-12 ${
                  isLast ? "" : "border-b border-edge/20"
                }`}
              >
                {/* Columna izquierda: dominio + descripción */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {/* Índice numerado en vez de icono genérico */}
                    <span className="font-mono text-sm tabular-nums text-accent/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                      {group.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted/60">
                    {group.description}
                  </p>
                </div>

                {/* Columna derecha: skills */}
                <div className="flex flex-col gap-3">
                  {skills.map((s, j) => (
                    <SkillRow key={s.name} skill={s} delay={0.1 + j * 0.05} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Fila de skill: nombre + barra de nivel (si existe) ─────────────
   Si no hay level, muestra el nombre como item limpio con punto cian. */
function SkillRow({
  skill,
  delay,
}: {
  skill: { name: string; level?: number };
  delay: number;
}) {
  const hasLevel = typeof skill.level === "number";

  if (!hasLevel) {
    // Sin nivel: keyword limpia con acento cian.
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay }}
        className="flex items-center gap-3 text-base text-fg/80"
      >
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent/50" />
        {skill.name}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-base text-fg/85">{skill.name}</span>
        <span className="font-mono text-xs tabular-nums text-muted/45">
          {skill.level}%
        </span>
      </div>
      {/* Barra de progreso — el riel y el relleno cian animado al entrar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-edge/10">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: (skill.level ?? 0) / 100 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + 0.1 }}
          style={{ transformOrigin: "left" }}
          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
        />
      </div>
    </motion.div>
  );
}
