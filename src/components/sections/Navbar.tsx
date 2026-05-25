"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const NAV_LINKS = [
  { href: "#about",          label: "About" },
  { href: "#experience",     label: "Experience" },
  { href: "#projects",       label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills",         label: "Skills" },
  { href: "#contact",        label: "Contact" },
] as const;

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = React.useState<string>(ids[0]);

  React.useEffect(() => {
    const visible = new Map<string, number>();

    const observers = ids.map((id) => {
      const el = document.querySelector(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.boundingClientRect.top);
          } else {
            visible.delete(id);
          }
          if (visible.size > 0) {
            const sorted = [...visible.entries()].sort((a, b) => a[1] - b[1]);
            setActive(sorted[0][0]);
          }
        },
        { threshold: 0.25, rootMargin: "-60px 0px -35% 0px" }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}

// ─── NavLink ───────────────────────────────────────────────────────────────

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full px-4 py-1.5 text-sm font-medium outline-none select-none"
    >
      {/* Active pill — white bg */}
      {isActive && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-full bg-white"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        />
      )}

      {/* Hover pill — subtle white glow, only when not active */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.span
            key="hover-pill"
            className="absolute inset-0 rounded-full bg-white/10"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <span
        className={[
          "relative z-10 transition-colors duration-200",
          isActive
            ? "text-black"
            : hovered
            ? "text-white"
            : "text-white/50",
        ].join(" ")}
      >
        {label}
      </span>
    </a>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────

const SECTION_IDS = NAV_LINKS.map((l) => l.href) as readonly string[];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const activeHref = useActiveSection(SECTION_IDS);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
      aria-label="Primary navigation"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Desktop ──────────────────────────────────── */}
      <nav
        className="hidden md:flex items-center gap-0.5 rounded-full bg-black px-2 py-1.5"
        aria-label="Primary"
      >
        <LayoutGroup id="nav">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              isActive={activeHref === l.href}
            />
          ))}
        </LayoutGroup>
      </nav>

      {/* ── Mobile trigger ───────────────────────────── */}
      <div className="flex md:hidden w-full max-w-sm items-center justify-between rounded-full bg-black px-4 py-2">
        <span className="text-sm font-medium text-white/60">
          {NAV_LINKS.find((l) => l.href === activeHref)?.label ?? ""}
        </span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            animate={open ? "open" : "closed"}
          >
            <motion.line
              x1="2" y1="5" x2="16" y2="5"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 4 } }}
              style={{ originX: "9px", originY: "5px" }}
            />
            <motion.line
              x1="2" y1="9" x2="16" y2="9"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
            />
            <motion.line
              x1="2" y1="13" x2="16" y2="13"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -4 } }}
              style={{ originX: "9px", originY: "13px" }}
            />
          </motion.svg>
        </button>
      </div>

      {/* ── Mobile dropdown ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[3.6rem] max-w-sm mx-auto rounded-2xl bg-black overflow-hidden p-1.5 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((l, i) => {
              const isActive = activeHref === l.href;
              return (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035, duration: 0.18 }}
                  className={[
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-black"
                      : "text-white/50 hover:bg-white/[0.07] hover:text-white",
                  ].join(" ")}
                >
                  {l.label}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}