"use client";

import * as React from "react";
import { useRef, useEffect, useState, type ElementType } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

/**
 * SplitText — port a TypeScript del componente oficial de reactbits.dev.
 * Usa el plugin SplitText de GSAP (gratuito desde v3.13) + ScrollTrigger,
 * para revelar el texto carácter por carácter con stagger cuando entra
 * en el viewport. useGSAP() limpia automáticamente al desmontar.
 */
export default function SplitText({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      const startPct = (1 - threshold) * 100;
      const mv = /^(-?\d+(?:\.\d+)?)(px|em|rem|%|vw|vh)?$/.exec(rootMargin);
      const marginValue = mv ? parseFloat(mv[1]) : 0;
      const marginUnit = mv ? mv[2] || "px" : "px";
      const sign =
        marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let splitter: GSAPSplitText;
      try {
        splitter = new GSAPSplitText(el, {
          type: splitType,
          linesClass: "split-line",
        });
      } catch (error) {
        console.error("Failed to create SplitText:", error);
        return;
      }

      let targets: Element[];
      switch (splitType) {
        case "lines":
          targets = splitter.lines;
          break;
        case "words":
          targets = splitter.words;
          break;
        default:
          targets = splitter.chars;
      }

      targets.forEach((t) => {
        (t as HTMLElement).style.willChange = "transform, opacity";
      });

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onComplete: onLetterAnimationComplete,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        splitter.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        fontsLoaded,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
      ],
      scope: ref,
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "normal",
    wordWrap: "break-word",
  };

  const Tag = tag as ElementType;
  return (
    <Tag ref={ref} className={`split-parent ${className}`} style={style}>
      {text}
    </Tag>
  );
}