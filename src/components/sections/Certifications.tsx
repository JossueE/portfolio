"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
  href: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "SolidWorks Fundamentals Certificate",
    issuer: "XpertMe",
    year: "Certificate",
    description:
      "Foundation in SolidWorks concepts supporting CAD-aware robot modeling, mechanical reasoning, and design communication.",
    image: "/images/solidworks_certificate.png",
    href: "/docs/JPET_CERTIFICADO_CONCEPTOS%20B%C3%81SICOS%20DE%20SOLIDWORKS.pdf",
  },
  {
    title: "Leadership Diploma",
    issuer: "Tecnologico de Monterrey",
    year: "2024",
    description:
      "Professional development in execution, team leadership, communication, and ownership across student and technical initiatives.",
    image: "/images/leadership_diploma.png",
    href: "/docs/leadership_diploma.pdf",
  },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="section-pad relative"
      aria-label="Certifications"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
        {/* Header mínimo, consistente con el resto */}
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted/50">
            <span className="size-1 rounded-full bg-accent/70" />
            Certifications
          </span>
          <h2 className="max-w-3xl text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Certifications &amp; development.
          </h2>
        </div>

        {/* Certificaciones como filas editoriales clicables */}
        <div className="flex flex-col">
          {CERTIFICATIONS.map((cert, index) => {
            const isLast = index === CERTIFICATIONS.length - 1;
            return (
              <motion.a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className={`group grid grid-cols-1 gap-6 py-10 sm:grid-cols-[200px_1fr] sm:gap-10 ${
                  isLast ? "" : "border-b border-edge/10"
                }`}
              >
                {/* Preview del certificado — discreto, sin gradientes */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-edge/10 bg-surface/[0.03] sm:aspect-[3/4] lg:aspect-[4/3]">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} preview`}
                    fill
                    sizes="(min-width: 640px) 200px, 100vw"
                    className="object-contain p-3 opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    priority={index === 0}
                  />
                </div>

                {/* Contenido editorial */}
                <div className="flex flex-col gap-3">
                  {/* Issuer · año como keywords con punto cian */}
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted/55">
                    <span className="font-medium uppercase tracking-[0.14em] text-accent/70">
                      {cert.issuer}
                    </span>
                    <span aria-hidden className="size-1 rounded-full bg-accent/40" />
                    {cert.year}
                  </span>

                  <h3 className="text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-2xl">
                    {cert.title}
                  </h3>

                  <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted/65 sm:text-base">
                    {cert.description}
                  </p>

                  {/* Indicador de enlace, tipográfico */}
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-fg/60 transition-colors group-hover:text-accent">
                    View certificate
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}