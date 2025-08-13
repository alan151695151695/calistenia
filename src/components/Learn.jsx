"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Learn({
  title = "Mira lo que vas a aprender en el curso",
  subtitle = "VideoClases Prácticas",
  centerImageSrc = "/images/learn-center.jpg",
  centerImageAlt = "Entrenamiento de calistenia",
  leftItems = [],
  rightItems = [],
  ctaLabel = "Sí, quiero empezar ahora",
  ctaHref = "/checkout",
}) {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          {/* Título y subtítulo */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {title.split(" ").map((w, i) =>
              w.toLowerCase().includes("aprender") ? (
                <span key={i} className="text-sky-400">
                  {w}{" "}
                </span>
              ) : (
                w + " "
              )
            )}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-2 text-zinc-400 md:text-lg"
          >
            {subtitle}
          </motion.p>

          {/* Grid 3 columnas */}
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Izquierda: bullets */}
            <motion.ul
              variants={fadeInUp}
              className="space-y-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              {leftItems.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex rounded-full bg-red-600/20 p-1">
                    <CheckCircle2 className="h-5 w-5 text-red-500" />
                  </span>
                  <span className="text-zinc-200 leading-relaxed">{text}</span>
                </li>
              ))}
            </motion.ul>

            {/* Centro: imagen */}
            <motion.div
              variants={fadeInUp}
              className="order-first lg:order-none"
            >
              <div className="mx-auto max-w-md rounded-xl overflow-hidden ring-1 ring-zinc-800 bg-zinc-900">
                <div className="relative h-[240px] md:h-[280px]">
                  <img
                    src={centerImageSrc}
                    alt={centerImageAlt}
                    className="absolute inset-0 w-full h-full object-contain bg-zinc-900 object top"
                  />
                </div>
              </div>
            </motion.div>

            {/* Derecha: bullets */}
            <motion.ul
              variants={fadeInUp}
              className="space-y-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              {rightItems.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex rounded-full bg-red-600/20 p-1">
                    <CheckCircle2 className="h-5 w-5 text-red-500" />
                  </span>
                  <span className="text-zinc-200 leading-relaxed">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Frase final + CTA */}
          <motion.p
            variants={fadeInUp}
            className="mt-10 text-2xl md:text-3xl font-extrabold"
          >
            Y mucho, <span className="text-zinc-200">mucho más</span>!
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg rounded-lg w-full md:w-auto"
            >
              <a
                href="/api/pay?redirect=1"
                aria-label={ctaLabel}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaLabel}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
