"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Menu, Sun, Moon, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [10, 24]);
  const bgOpacity = useTransform(scrollY, [0, 200], [0.4, 0.8]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <motion.header
      style={{
        backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined,
      }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={cn(
          "liquid-glass glass-edge relative flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-5"
        )}
        style={{
          backgroundColor: `rgba(20,20,26,${bgOpacity.get() ?? 0.5})`,
        }}
      >
        <a href="#home" className="group relative flex items-center gap-2.5">
          <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/20 to-white/5 shadow-glass-sm">
            <span className="font-mono text-[13px] font-semibold tracking-tighter text-white/90">
              JE
            </span>
          </span>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight text-white">
              Jossue Espinoza
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">
              Robotics Engineer
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
          <a
            href="https://github.com/JossueE"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white sm:inline-flex"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="liquid-glass glass-edge absolute left-4 right-4 top-[4.6rem] z-40 mx-auto max-w-5xl p-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/JossueE"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
