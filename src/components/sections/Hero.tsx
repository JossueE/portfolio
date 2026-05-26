"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import SplitText from "../animations/SplitText";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Imagen SUBE al hacer scroll -> tapa el contenido. Más recorrido = más notorio.
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]), {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  // El contenido (texto) BAJA y se desvanece -> se oculta tras la imagen.
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "32%"]), {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });
  const textOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.45], [1, 0]),
    { stiffness: 80, damping: 22 }
  );

  // La palabra gigante de fondo sube más lento (parallax sutil).
  const bgWordY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]),
    { stiffness: 50, damping: 20 }
  );

  // Scroll indicator fade.
  const scrollOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.14], [1, 0]),
    { stiffness: 90, damping: 24 }
  );

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate min-h-svh w-full overflow-hidden"
      // Fondo del hero: igual al color del cielo de la imagen para que
      // NO se vea espacio raro al subir la imagen en el parallax.
      style={{ backgroundColor: "#D2CFD1" }}
    >
      {/* ── CAPA 2: Palabra gigante de fondo ─────────────────────────── */}
      <motion.div
        aria-hidden
        style={{ y: bgWordY }}
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          className="select-none font-semibold leading-none tracking-tighter text-neutral-900/[0.06]"
          style={{ fontSize: "clamp(7rem, 26vw, 24rem)" }}
        >
          ROBOTICS
        </motion.span>
      </motion.div>

      {/* ── CAPA 3: Texto — nombre arriba, rol arriba-derecha ────────── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 z-10"
      >
        {/* Padding izquierdo reducido -> nombre más pegado a la izquierda.
            En desktop el contenedor ya no está centrado con mx-auto. */}
        <div className="flex h-full min-h-svh w-full flex-col px-5 sm:px-8 lg:px-12">
          {/* Fila superior: en móvil apilado (columna), en sm+ lado a lado.
              Evita que "Espinoza" se parta por falta de ancho. */}
          <div className="flex flex-col gap-8 pt-20 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:pt-24 lg:pt-28">
            {/* Izquierda — Nombre con SplitText (reactbits + GSAP) */}
            <div className="flex flex-col gap-1">
              <SplitText
                tag="h1"
                text="Jossue"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
                className="block text-[clamp(2.4rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-tight text-neutral-900"
              />
              <SplitText
                tag="h1"
                text="Espinoza"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
                className="block text-[clamp(2.4rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-tight text-neutral-900"
              />
            </div>

            {/* Derecha — Rol + descripción */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="flex max-w-[24ch] flex-col items-start gap-3 text-left sm:max-w-[18ch] sm:items-end sm:pt-2 sm:text-right lg:max-w-[24ch]"
            >
              <p className="text-[clamp(0.95rem,2vw,1.6rem)] font-medium leading-tight text-neutral-900/85">
                Robotics &amp;
                <br />
                Autonomous Systems
                <br />
                Engineer
              </p>
              <p className="max-w-[24ch] text-[clamp(0.7rem,1.1vw,0.85rem)] leading-relaxed text-neutral-900/45">
                <span className="text-cyan-600">From prototype to deployment</span>
                <br />
                ROS 2, C++, motor control simulation &amp; local AI.
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                className="h-px w-24 origin-left bg-gradient-to-r from-cyan-600/60 to-transparent sm:origin-right sm:bg-gradient-to-l"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── CAPA 4: Imagen hero a pantalla completa ──────────────────── */}
      {/* h-[140%] + un bloque negro debajo de la imagen: al subir, en vez de
          descubrir el fondo gris, se ve negro que empata con la sección de
          abajo, eliminando el "espacio raro". */}
      <motion.div
        aria-hidden
        style={{ y: imgY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full will-change-transform"
      >
        <motion.img
          src="/images/hero.webp"
          alt=""
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-full w-full select-none object-cover object-bottom"
        />
        {/* Relleno negro pegado al borde inferior de la imagen: al subir el
            conjunto, este bloque cubre lo que quedaría descubierto, empatando
            con la sección negra de abajo en vez de mostrar el gris del hero. */}
        <div className="absolute inset-x-0 top-full h-screen bg-black" />
      </motion.div>

      {/* ── CAPA 5: Links sociales — POR ENCIMA de la imagen (z-40) ──── */}
      {/* Fuera del bloque de texto con parallax, así siempre se ven y son
          clicables (pointer-events activos). */}
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        className="absolute bottom-8 left-5 z-40 flex items-center gap-4 text-xs font-medium text-white/80 sm:left-8 sm:gap-5 sm:text-sm lg:left-12"
      >
        <a
          href="https://github.com/JossueE"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 transition-colors hover:text-white uppercase"
        >
          GitHub
          <span className="text-cyan-400/0 transition-colors group-hover:text-cyan-400/90">
            ↗
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/jossuee"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 transition-colors hover:text-white uppercase"
        >
          LinkedIn
          <span className="text-cyan-400/0 transition-colors group-hover:text-cyan-400/90">
            ↗
          </span>
        </a>

        <a
          href="mailto:kadavetar10@gmail.com"
          className="group flex items-center gap-1.5 transition-colors hover:text-white uppercase"
        >
          Email
          <span className="text-cyan-400/0 transition-colors group-hover:text-cyan-400/90">
            ↗
          </span>
        </a>
      </motion.nav>

      {/* ── Scroll indicator (minimalista) ───────────────────────────── */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        aria-hidden
        className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-[10px] uppercase tracking-[0.4em] text-neutral-900/40"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
