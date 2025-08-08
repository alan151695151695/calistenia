"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function Guarantee({
  eyebrow = "Riesgo Cero para ti",
  highlight = "7 Días",
  descHtml = "¿Aún no estás seguro? No te preocupes.<br/>Si el contenido no es lo que prometemos, tienes <strong>7 días de garantía</strong> para pedir tu reembolso — sin burocracia.",
  note = "Tu acceso a la plataforma es de por vida y siempre añadimos nuevas lecciones.",
  badgeSrc = "/images/garantia-7dias.png",
  badgeAlt = "Sello de garantía de 7 días"
}) {
  return (
    <section className="py-16 bg-white text-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 md:grid-cols-12 items-center"
        >
          {/* Columna de texto */}
          <motion.div variants={fadeInUp} className="md:col-span-7">
            <p className="text-zinc-500">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Experimenta por{" "}
              <span className="text-sky-500">{highlight}!</span>
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descHtml }}
            />
            <p className="mt-4 text-zinc-600">{note}</p>
          </motion.div>

          {/* Columna de imagen */}
          <motion.div variants={fadeInUp} className="md:col-span-5 flex justify-center">
            <img
              src={badgeSrc}
              alt={badgeAlt}
              className="max-w-xs w-full object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
