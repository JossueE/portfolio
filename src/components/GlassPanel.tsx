"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  intensity?: "subtle" | "regular" | "strong";
  interactive?: boolean;
  bordered?: boolean;
};

export function GlassPanel({
  as: Tag = "div",
  intensity = "regular",
  interactive = false,
  bordered = true,
  className,
  children,
  ...props
}: GlassPanelProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      className={cn(
        "relative overflow-hidden rounded-3xl backdrop-blur-2xl",
        intensity === "subtle" && "bg-white/[0.03]",
        intensity === "regular" && "bg-white/[0.05]",
        intensity === "strong" && "bg-white/[0.08]",
        bordered && "border border-white/10 shadow-glass",
        interactive &&
          "group transition-transform duration-500 will-change-transform hover:-translate-y-0.5",
        "glass-edge",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay"
      />
      {interactive && <span aria-hidden className="glass-sheen" />}
      <div className="relative">{children}</div>
    </Comp>
  );
}
