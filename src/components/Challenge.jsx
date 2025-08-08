"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function Challenge({
  heading = "PAQUETE COMPLETO:",
  subheading = "Acceso inmediato",
  items = [
    {
      imageSrc: "/images/challenge-1.png",
      imageAlt: "Videos de entrenamientos",
      title: "Desafío +421 Movimientos",
      titleVariant: "primary", // "primary" pinta el título en azul tipo link
      description:
        "Este desafío presenta ejercicios con peso corporal en múltiples formatos diseñados para transformarte.",
    },
    {
      imageSrc: "/images/challenge-2.png",
      imageAlt: "Gifs explicativos",
      title: "+1001 GIFs de Calistenia",
      description:
        "Gifs explicando cada ejercicio para ayudarte con la ejecución correcta paso a paso.",
    },
    {
      imageSrc: "/images/challenge-3.png",
      imageAlt: "Plantillas de entrenamiento",
      title: "Plantillas de Entrenamiento",
      description:
        "Rutinas personalizadas y dinámicas con progresión constante. Nunca más te quedas sin ideas.",
    },
  ],
}) {
  return (
    <section className="py-20 bg-white text-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          {/* Título rojo centrado */}
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-extrabold tracking-tight text-red-600 uppercase"
          >
            {heading} <span className="text-red-600"> </span>
          </motion.h2>

          {/* Subtítulo gris */}
          <motion.p
            variants={fadeInUp}
            className="mt-2 text-zinc-500 md:text-lg"
          >
            {subheading}
          </motion.p>

          {/* Grid de 3 columnas */}
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {items.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                {/* Imagen */}
                <div className="rounded-2xl border border-zinc-200 shadow-sm overflow-hidden bg-white">
                  <div className="relative h-54 sm:h-84">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      className="absolute inset-0 h-full w-full object-contain object-center"
                    />
                  </div>
                </div>

                {/* Título debajo (el primero azul estilo link) */}
                <h3
                  className={[
                    "mt-4 text-xl font-semibold",
                    item.titleVariant === "primary"
                      ? "text-blue-600 hover:underline cursor-pointer"
                      : "text-zinc-900",
                  ].join(" ")}
                >
                  {item.title}
                </h3>

                {/* Descripción */}
                <p className="mt-2 text-zinc-600 leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
