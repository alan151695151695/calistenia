"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function AccessSteps({
  eyebrow = "Acceso inmediato y vitalicio",
  // usa HTML para pintar en azul la parte que quieras
  titleHtml = "¿Cómo <span class='text-sky-600'>accedes</span> a tu curso?",
  paragraphs = [
    "Después de completar tu pedido, recibirás un correo con tus datos de acceso y las instrucciones para entrar a tu área de alumno.",
    "Al iniciar sesión, podrás comenzar tus clases de inmediato."
  ],
}) {
  return (
    <section className="py-16 bg-zinc-50 text-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-zinc-500"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mt-1 text-3xl md:text-5xl font-extrabold leading-tight"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />

          <div className="mt-5 space-y-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className="text-zinc-700 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
