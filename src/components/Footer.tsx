"use client";

import * as React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/10 px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 font-mono text-[12px] font-semibold tracking-tighter text-white/85">
            JE
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              Jossue Espinoza
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">
              Robotics &amp; Autonomous Systems
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/JossueE"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/jossuee"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:kadavetar10@gmail.com"
            aria-label="Email"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <Mail className="size-4" />
          </a>
        </div>

        <p className="text-xs text-white/45">
          &copy; {new Date().getFullYear()} Jossue Espinoza. Built with Next.js,
          Tailwind &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
