"use client";

import * as React from "react";

export function FloatingShapes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Soft radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(255,255,255,0.10),rgba(255,255,255,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_10%_30%,rgba(255,255,255,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_90%_70%,rgba(255,255,255,0.05),rgba(255,255,255,0)_60%)]" />

      {/* Drifting glass orbs */}
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-white/[0.05] blur-3xl animate-drift" />
      <div
        className="absolute right-[-6rem] top-44 h-96 w-96 rounded-full bg-white/[0.07] blur-3xl animate-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute left-1/3 top-[60%] h-80 w-80 rounded-full bg-white/[0.04] blur-3xl animate-drift"
        style={{ animationDelay: "-12s" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
    </div>
  );
}
