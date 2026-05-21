"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Github,
  Play,
  Sparkles,
  Wrench,
  Layers,
  Cpu,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
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
    return () => {
      window.removeEventListener("keydown", onKey);
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
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            className="liquid-glass glass-edge relative flex max-h-[calc(100svh-2rem)] w-full max-w-4xl flex-col overflow-hidden sm:max-h-[calc(100svh-4rem)]"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur-md transition-colors hover:bg-black/60"
            >
              <X className="size-4" />
            </button>

            <div className="min-h-0 overflow-y-auto">
              {project.youtubeId && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black">
                  <iframe
                    src={youtubeEmbed(project.youtubeId)}
                    title={`${project.title} demo`}
                    loading="lazy"
                    className="absolute inset-0 size-full grayscale-[20%]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex flex-col gap-8 p-6 sm:p-10">
              <header className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {project.categories.map((c) => (
                    <span
                      key={c}
                      className="chip text-[10px] uppercase tracking-[0.2em] text-white/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h2
                  id={`modal-title-${project.id}`}
                  className="display-title text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {project.title}
                </h2>
                <p className="text-pretty text-base text-white/65 sm:text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {project.github.map((url, i) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-glass !py-2"
                    >
                      <Github className="size-4" />
                      {project.github.length > 1
                        ? `GitHub · Repo ${i + 1}`
                        : "GitHub"}
                    </a>
                  ))}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-glass !py-2"
                    >
                      <Play className="size-4" />
                      Watch demo
                    </a>
                  )}
                </div>
              </header>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailBlock icon={Sparkles} title="Problem">
                  {project.problem}
                </DetailBlock>
                <DetailBlock icon={Wrench} title="Solution">
                  {project.solution}
                </DetailBlock>
                <DetailBlock icon={Layers} title="Technical architecture">
                  {project.architecture}
                </DetailBlock>
                <DetailBlock icon={Cpu} title="My contribution">
                  {project.contribution}
                </DetailBlock>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                  Technologies used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                  Pipeline
                </h3>
                <ol className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
                  {project.pipeline.map((step, i) => (
                    <li
                      key={step.title}
                      className="relative flex min-w-[200px] snap-start flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:min-w-[180px] sm:flex-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>
                        {i < project.pipeline.length - 1 && (
                          <ChevronRight className="size-3.5 text-white/30" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {step.title}
                      </span>
                      <span className="text-xs leading-relaxed text-white/55">
                        {step.description}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    <Sparkles className="size-3.5" />
                    Highlights
                  </h3>
                  <ul className="space-y-2 text-sm text-white/75">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1 size-1 rounded-full bg-white/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    <Lightbulb className="size-3.5" />
                    What I learned
                  </h3>
                  <ul className="space-y-2 text-sm text-white/75">
                    {project.learnings.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1 size-1 rounded-full bg-white/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

type DetailBlockProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
};

function DetailBlock({ icon: Icon, title, children }: DetailBlockProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
          <Icon className="size-4 text-white/85" />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{children}</p>
    </div>
  );
}
