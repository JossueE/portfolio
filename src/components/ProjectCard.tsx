"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { GlassPanel } from "@/components/GlassPanel";
import { youtubeThumb } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
};

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.05 }}
      className="h-full"
    >
      <GlassPanel
        interactive
        className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
      >
        {project.youtubeId && (
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Open ${project.title} details`}
            className="relative block aspect-[16/9] w-full overflow-hidden border-b border-white/10"
          >
            <Image
              src={youtubeThumb(project.youtubeId, "hq")}
              alt={`${project.title} demo thumbnail`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority={index < 2}
            />
            <span className="absolute left-4 top-4 flex flex-wrap gap-1.5">
              {project.categories.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="chip border-white/25 bg-white/15 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md"
                >
                  {c}
                </span>
              ))}
            </span>
            <span className="absolute bottom-4 right-4 inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-glass-sm backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
              <Play className="size-5 translate-x-[1px]" />
            </span>
          </button>
        )}

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/55">{project.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-white/70">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((t) => (
              <span key={t} className="chip text-[11px]">
                {t}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="chip text-[11px] text-white/55">
                +{project.tags.length - 6}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="btn-glass !py-2 !px-4 !text-xs"
            >
              View details
              <ArrowUpRight className="size-3.5" />
            </button>
            {project.github.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repository ${i + 1} for ${project.title}`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Github className="size-4" />
              </a>
            ))}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Demo video for ${project.title}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Play className="size-3.5" />
                Demo
              </a>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.article>
  );
}
