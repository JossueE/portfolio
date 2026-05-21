"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";

export function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="Education"
          title="Education"
          description="Academic foundation in robotics, digital systems, leadership, and engineering execution."
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <GlassPanel intensity="strong" className="p-7 sm:p-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-glass-sm">
                  <GraduationCap className="size-5 text-white/90" />
                </span>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    B.S. Robotics &amp; Digital Systems Engineering
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="chip">
                      <MapPin className="size-3.5" />
                      Tecnológico de Monterrey · Mexico City
                    </span>
                    <span className="chip">
                      <Calendar className="size-3.5" />
                      2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 lg:max-w-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  <Award className="size-4" />
                  Scholarship
                </div>
                <p className="mt-3 text-base font-medium leading-relaxed text-white/85">
                  Leadership in Action Talent Scholarship
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
