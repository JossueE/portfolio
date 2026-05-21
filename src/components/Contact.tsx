"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";
import { SectionHeader } from "@/components/SectionHeader";

const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/JossueE",
    href: "https://github.com/JossueE",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/jossuee",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kadavetar10@gmail.com",
    href: "mailto:kadavetar10@gmail.com",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto w-full max-w-6xl">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/[0.05] blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-white/[0.04] blur-3xl"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title={
                  <>
                    Let&apos;s build something —{" "}
                    <span className="text-white/55">autonomous.</span>
                  </>
                }
                description="Open to robotics, autonomous systems, embedded software, simulation, and pre-sales technical engineering roles."
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <a
                  href="mailto:kadavetar10@gmail.com"
                  className="btn-solid"
                >
                  <Mail className="size-4" />
                  Get in touch
                </a>
                <a
                  href="https://github.com/JossueE"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.1 + i * 0.07,
                  }}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                      <l.icon className="size-4 text-white/90" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {l.label}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {l.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 text-white/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
