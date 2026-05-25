"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  animate,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { projects, type Project } from "@/data/projects";
import { youtubeThumb } from "@/lib/utils";

export function Projects() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [active, setActive] = React.useState(0);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const x = useMotionValue(0);

  // Guarda si el último gesto fue un drag (para cancelar el click/abrir modal).
  const draggedRef = React.useRef(false);

  const [offsets, setOffsets] = React.useState<number[]>([]);
  const [maxScroll, setMaxScroll] = React.useState(0);

  const measure = React.useCallback(() => {
    if (!viewportRef.current) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const base = cards[0].offsetLeft;
    const offs = cards.map((c) => -(c.offsetLeft - base));

    const track = viewportRef.current.scrollWidth;
    const view = viewportRef.current.offsetWidth;
    const max = Math.min(0, view - track);
    setMaxScroll(max);
    setOffsets(offs.map((o) => Math.max(o, max)));
  }, []);

  React.useEffect(() => {
    measure();
    const t = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = React.useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, projects.length - 1));
      const target = offsets[clamped] ?? 0;
      setActive(clamped);
      animate(x, target, {
        type: "spring",
        stiffness: 260,
        damping: 36,
        mass: 0.9,
      });
    },
    [offsets, x]
  );

  // Marca que empezó un arrastre real (umbral mínimo de movimiento).
  const onDragStart = () => {
    draggedRef.current = true;
  };

  // Snap a la card más cercana al soltar (con sesgo por velocidad).
  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const projected = x.get() + info.velocity.x * 0.18;
    let nearest = 0;
    let best = Infinity;
    offsets.forEach((o, i) => {
      const d = Math.abs(projected - o);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    goTo(nearest);
    // Resetea el flag un tick después, para que el click suprimido no abra el modal.
    setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  // Abre el modal solo si NO venimos de un arrastre.
  const handleOpen = (project: Project) => {
    if (draggedRef.current) return;
    setSelected(project);
  };

  const canPrev = active > 0;
  const canNext = active < projects.length - 1;

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      aria-label="Projects"
    >
      {/* Header — único elemento con padding cómodo */}
      <div className="mb-14 flex w-full items-end justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/50">
            <span className="size-1 rounded-full bg-accent/70" />
            Projects
          </span>
          <h2 className="max-w-3xl text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Selected work in robotics &amp; autonomy.
          </h2>
        </div>

        <div className="hidden shrink-0 items-center gap-3 pb-2 lg:flex">
          <NavArrow dir="prev" disabled={!canPrev} onClick={() => goTo(active - 1)} />
          <NavArrow dir="next" disabled={!canNext} onClick={() => goTo(active + 1)} />
        </div>
      </div>

      {/* ── Carrusel full-bleed ──────────────────────────────────────
          touchAction "pan-y": deja el scroll vertical al navegador pero
          permite que framer capture el arrastre horizontal (clave en táctil). */}
      <div ref={viewportRef} className="w-full overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: maxScroll, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          style={{ x, touchAction: "pan-y" }}
          className="flex cursor-grab items-stretch gap-5 px-6 active:cursor-grabbing sm:gap-6 sm:px-10 lg:px-16"
        >
          {projects.map((project, i) => (
            <ProjectSlide
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              project={project}
              index={i}
              onOpen={handleOpen}
            />
          ))}
        </motion.div>
      </div>

      {/* Indicadores + hint */}
      <div className="mt-10 flex w-full items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to project ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-accent/70" : "w-1.5 bg-edge/25 hover:bg-edge/40"
              }`}
            />
          ))}
        </div>
        <span className="flex items-center gap-2 text-xs text-muted/40 lg:hidden">
          <ArrowLeft className="size-3.5" />
          Drag
          <ArrowRight className="size-3.5" />
        </span>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ── Card VERTICAL (poster) ─────────────────────────────────────────
   Ya NO es un <button> (eso robaba el gesto de drag). Es un div con
   onClick + soporte de teclado; el padre decide si fue tap o drag. */
const ProjectSlide = React.forwardRef<
  HTMLDivElement,
  {
    project: Project;
    index: number;
    onOpen: (p: Project) => void;
  }
>(function ProjectSlide({ project, index, onOpen }, ref) {
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className="group relative aspect-[3/4] w-[78vw] shrink-0 sm:w-[52vw] md:w-[40vw] lg:w-[30vw] xl:w-[26rem]"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        aria-label={`Open ${project.title} details`}
        // Imagen no arrastrable + sin selección, para que el drag fluya limpio.
        className="relative block size-full cursor-pointer select-none overflow-hidden rounded-[1.75rem] border border-edge/10 bg-surface/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        {project.youtubeId && (
          <Image
            src={youtubeThumb(project.youtubeId)}
            alt={`${project.title} demo`}
            fill
            draggable={false}
            sizes="(min-width:1280px) 26rem, (min-width:1024px) 30vw, (min-width:768px) 40vw, (min-width:640px) 52vw, 78vw"
            className="pointer-events-none object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
            priority={index < 2}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

        <span className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-500 group-hover:border-accent/40 group-hover:text-accent">
          <Play className="size-4 translate-x-[1px]" />
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
          <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
            <span className="size-1 rounded-full bg-accent/70" />
            {project.categories[0]}
          </span>

          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
            {project.title}
          </h3>

          <p className="line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-white/65">
            {project.tagline}
          </p>

          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white/0 transition-all duration-300 group-hover:text-white">
            View details
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
});

function NavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous projects" : "Next projects"}
      className="inline-flex size-12 items-center justify-center rounded-full border border-edge/15 bg-surface/[0.04] text-fg/80 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge/15 disabled:hover:bg-surface/[0.04] disabled:hover:text-fg/80"
    >
      <Icon className="size-5" />
    </button>
  );
}