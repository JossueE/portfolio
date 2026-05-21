"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassPanel } from "@/components/GlassPanel";
import leadershipDiplomaPreview from "../../docs/images/leadership_diploma_preview.png";
import solidWorksCertificatePreview from "../../docs/images/solidworks_certificate_preview.png";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: StaticImageData;
  href: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "SolidWorks Fundamentals Certificate",
    issuer: "XpertMe",
    year: "Certificate",
    description:
      "Foundation in SolidWorks concepts supporting CAD-aware robot modeling, mechanical reasoning, and design communication.",
    image: solidWorksCertificatePreview,
    href: "/docs/files/JPET_CERTIFICADO_CONCEPTOS%20B%C3%81SICOS%20DE%20SOLIDWORKS.pdf",
  },
  {
    title: "Leadership Diploma",
    issuer: "Tecnologico de Monterrey",
    year: "2024",
    description:
      "Professional development in execution, team leadership, communication, and ownership across student and technical initiatives.",
    image: leadershipDiplomaPreview,
    href: "/docs/files/leadership_diploma.pdf",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeader
          eyebrow="Certifications"
          title="Certifications & development"
          description="Selected credentials that support mechanical-aware robotics, product thinking, and cross-functional execution."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CERTIFICATIONS.map((certification, index) => (
            <motion.article
              key={certification.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="h-full"
            >
              <GlassPanel interactive className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/[0.03]">
                  <Image
                    src={certification.image}
                    alt={`${certification.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-3 opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip text-[10px] uppercase tracking-[0.18em]">
                      {certification.issuer}
                    </span>
                    <span className="chip text-[10px] uppercase tracking-[0.18em] text-white/60">
                      {certification.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {certification.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {certification.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <a
                      href={certification.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-glass !py-2 !px-4 !text-xs"
                    >
                      View certificate
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </GlassPanel>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
