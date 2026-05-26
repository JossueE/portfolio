"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Play, Search } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { projects, type Project } from "@/data/projects";
import { youtubeThumb } from "@/lib/utils";

export function Projects() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((project) => {
      if (!q) return true;

      const searchable = [
        project.title,
        project.tagline,
        project.description,
        ...project.categories,
        ...project.tags,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [query]);

  return (
    <section
      id="projects"
      className="section-pad relative overflow-hidden"
      aria-label="Projects"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/60"
          >
            <span className="size-1 rounded-full bg-accent/70" />
            Featured Projects
          </motion.span>

          <div className="flex max-w-3xl flex-col gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl lg:leading-[1.04]"
            >
              Selected work in robotics &amp; autonomy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="text-pretty text-base leading-relaxed text-muted/70 sm:text-lg"
            >
              Each project below is a full stack, from sensors to behavior,
              built with ROS 2, simulation, control, and AI components.
            </motion.p>
          </div>
        </header>

        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted/45" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tools, or tags..."
            className="liquid-glass glass-edge h-11 w-full rounded-full px-11 text-sm text-fg/85 outline-none transition-colors placeholder:text-muted/45 focus:border-accent/30 focus:bg-accent/5"
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="liquid-glass glass-edge flex items-center justify-center rounded-[1.75rem] p-12 text-sm text-muted/65">
            No projects match the current search.
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group h-full"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} details`}
        onClick={() => onOpen(project)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(project);
          }
        }}
        className="liquid-glass glass-edge flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] outline-none transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.title} details`}
          className="relative block aspect-[16/9] w-full overflow-hidden border-b border-edge/10 bg-black"
        >
          {project.youtubeId && (
            <Image
              src={youtubeThumb(project.youtubeId)}
              alt={`${project.title} demo thumbnail`}
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
              priority={index < 2}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/20" />

          <span className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {project.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="chip border-white/25 bg-white/15 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md"
              >
                {category}
              </span>
            ))}
          </span>

          <span className="absolute bottom-4 right-4 inline-flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-glass-sm backdrop-blur-xl transition-all duration-500 group-hover:border-white/45 group-hover:bg-white/20 group-hover:text-white">
            <Play className="size-5 translate-x-[1px]" />
          </span>
        </button>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-fg transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="text-sm text-muted/65">{project.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-muted/75">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((tag) => (
              <span key={tag} className="chip text-[11px]">
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="chip text-[11px] text-muted/65">
                +{project.tags.length - 6}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="btn-glass !px-4 !py-2 !text-xs"
            >
              View details
              <ArrowUpRight className="size-3.5" />
            </button>

            {project.github.map((url, repositoryIndex) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repository ${repositoryIndex + 1} for ${project.title}`}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex size-9 items-center justify-center rounded-full border border-edge/15 bg-surface/[0.04] text-fg/80 backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
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
                onClick={(event) => event.stopPropagation()}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-edge/15 bg-surface/[0.04] px-3 text-xs text-fg/80 backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Play className="size-3.5" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
