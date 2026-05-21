"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";
import { SkillBadge } from "@/components/SkillBadge";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              The stack behind the robots —{" "}
              <span className="text-white/55">from kernel to LLM.</span>
            </>
          }
          description="Grouped by domain so it's easy to see where each tool fits in the autonomy pipeline."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: i * 0.06,
              }}
              className="h-full"
            >
              <GlassPanel
                interactive
                className="flex h-full flex-col gap-4 p-6"
              >
                <div className="grid min-h-[76px] grid-cols-[40px_1fr] items-start gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-glass-sm">
                    <group.icon className="size-4 text-white/90" />
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-base font-semibold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-white/55">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="hairline" />
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s, j) => (
                    <SkillBadge key={s} label={s} delay={0.04 * j} />
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
