"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { youtubeEmbed } from "@/lib/utils";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Bloquea el scroll del body mientras el modal está abierto.
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 -z-10 bg-black/80 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            className="liquid-glass glass-edge relative flex max-h-[calc(100svh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] sm:max-h-[calc(100svh-4rem)]"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur-md transition-colors hover:border-accent/30 hover:bg-accent/20 hover:text-accent"
            >
              <X className="size-4" />
            </button>

            <div className="min-h-0 overflow-y-auto">
              {/* Video protagonista */}
              {project.youtubeId && (
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={youtubeEmbed(project.youtubeId)}
                    title={`${project.title} demo`}
                    loading="lazy"
                    className="absolute inset-0 size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Contenido editorial — generoso, sin cajas ni iconos */}
              <div className="flex flex-col gap-12 p-7 sm:p-10 lg:p-12">
                {/* Encabezado */}
                <header className="flex flex-col gap-4">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.22em] text-accent/70">
                    {project.categories.map((c, i) => (
                      <React.Fragment key={c}>
                        {i > 0 && (
                          <span aria-hidden className="size-1 rounded-full bg-accent/40" />
                        )}
                        {c}
                      </React.Fragment>
                    ))}
                  </span>
                  <h2
                    id={`modal-title-${project.id}`}
                    className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
                  >
                    {project.title}
                  </h2>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted/75 sm:text-lg">
                    {project.description}
                  </p>

                  {/* Acciones */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.github.map((url, i) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-edge/15 bg-surface/[0.04] px-4 py-2 text-sm font-medium text-fg/85 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                      >
                        <Github className="size-4" />
                        {project.github.length > 1 ? `Repo ${i + 1}` : "GitHub"}
                      </a>
                    ))}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-edge/15 bg-surface/[0.04] px-4 py-2 text-sm font-medium text-fg/85 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                      >
                        <Play className="size-4" />
                        Watch demo
                      </a>
                    )}
                  </div>
                </header>

                <div className="hairline" />

                {/* Problem / Solution / Architecture / Contribution
                    como secciones editoriales en prosa, sin cajas. */}
                <div className="flex flex-col gap-10">
                  <NarrativeBlock label="Problem" text={project.problem} />
                  <NarrativeBlock label="Solution" text={project.solution} />
                  <NarrativeBlock
                    label="Technical architecture"
                    text={project.architecture}
                  />
                  <NarrativeBlock
                    label="My contribution"
                    text={project.contribution}
                  />
                </div>

                <div className="hairline" />

                {/* Pipeline — pasos numerados verticales, limpios */}
                <section className="flex flex-col gap-6">
                  <Eyebrow>Pipeline</Eyebrow>
                  <ol className="flex flex-col">
                    {project.pipeline.map((step, i) => (
                      <li
                        key={step.title}
                        className="relative grid grid-cols-[auto_1fr] gap-5 pb-8 last:pb-0"
                      >
                        {/* Número + línea conectora */}
                        <div className="relative flex flex-col items-center">
                          <span className="z-10 font-mono text-sm tabular-nums text-accent/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {i < project.pipeline.length - 1 && (
                            <span className="mt-2 w-px flex-1 bg-gradient-to-b from-accent/30 to-transparent" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1 pb-1">
                          <h4 className="text-base font-semibold text-fg">
                            {step.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-muted/65">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <div className="hairline" />

                {/* Highlights + Learnings — listas limpias en dos columnas */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <ListBlock label="Highlights" items={project.highlights} />
                  <ListBlock label="What I learned" items={project.learnings} />
                </div>

                <div className="hairline" />

                {/* Technologies — keywords minimalistas al final */}
                <section className="flex flex-col gap-4">
                  <Eyebrow>Technologies</Eyebrow>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg/70">
                    {project.technologies.map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && (
                          <span aria-hidden className="size-1 rounded-full bg-accent/40" />
                        )}
                        {t}
                      </React.Fragment>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Eyebrow reutilizable (consistente con el resto de la página) ──── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-muted/45">
      <span className="size-1 rounded-full bg-accent/60" />
      {children}
    </span>
  );
}

/* ── Bloque narrativo: eyebrow + prosa, sin caja ni icono ─────────── */
function NarrativeBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{label}</Eyebrow>
      <p className="max-w-2xl text-pretty text-base leading-relaxed text-fg/75">
        {text}
      </p>
    </div>
  );
}

/* ── Lista limpia con acento cian mínimo ──────────────────────────── */
function ListBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="flex flex-col gap-4">
      <Eyebrow>{label}</Eyebrow>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg/70">
            <span
              aria-hidden
              className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent/50"
            />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}