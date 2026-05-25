"use client";

import * as React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  /** Color base (sin revelar) — gris tenue. */
  baseColor?: string;
  /** Color revelado — blanco/fg. */
  revealColor?: string;
  className?: string;
  /** Etiqueta semántica del contenedor. */
  as?: "p" | "h2" | "h3" | "div";
  /** Dónde empieza/termina el scrub respecto al viewport. */
  start?: string;
  end?: string;
}

/**
 * ScrollReveal — efecto "text reveal on scroll" estilo Apple/GSAP.
 * Divide el texto en palabras y, ligado al scroll (scrub), cada palabra
 * pasa del color base (gris) al color revelado (blanco), como si el texto
 * se iluminara a medida que lo lees. Minimalista, sin dependencias extra.
 */
export function ScrollReveal({
  children,
  baseColor = "rgba(160,160,168,0.25)",
  revealColor = "rgba(232,232,234,0.95)",
  className = "",
  as: Tag = "p",
  start = "top 90%",
  end = "bottom 55%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const words = children.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const wordEls = ref.current.querySelectorAll<HTMLElement>("[data-word]");

      gsap.fromTo(
        wordEls,
        { color: baseColor },
        {
          color: revealColor,
          ease: "none",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: true,
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { dependencies: [children, baseColor, revealColor, start, end], scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            data-word
            style={{ color: baseColor, transition: "color 0.1s linear" }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}