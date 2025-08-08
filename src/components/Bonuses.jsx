"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function Bonuses({
  heading = "Más 3 Bonos Especiales",
  highlightWord = "3", // se pinta en azul dentro del heading
  subheading = "Tu anticipación salva vidas",
  items = [
    {
      imageSrc: "/images/bonus-21dias.jpg",
      imageAlt: "Desafío 21 días",
      title: "DESAFÍO 21 DÍAS INSANOS",
      descHtml:
        "Durante 21 días, vas a enfrentar entrenos intensos con peso corporal — sin gimnasio ni equipo, sin excusas.",
    },
    {
      imageSrc: "/images/bonus-planche.jpg",
      imageAlt: "Fórmula de la Planche",
      title: "LA FÓRMULA DE LA PLANCHE",
      descHtml:
        "Protocolo paso a paso para <strong>pasar de cero</strong> a <strong>control total</strong> usando solo tu peso.",
    },
    {
      imageSrc: "/images/bonus-dna.jpg",
      imageAlt: "Metabolismo al máximo",
      title: "DNA DEL CUERPO DEFINIDO",
      descHtml:
        "Ajustes invisibles que activan tu metabolismo en <strong>modo quema</strong> 24/7 y te ayudan a definir.",
    },
  ],
  imageHeight = 420, // ajusta alto visual de las imágenes
}) {
  // Pinta en azul la palabra/número indicado dentro del heading
  const paintedHeading = heading.replace(
    new RegExp(`(${highlightWord})`, "i"),
    "<span class='text-blue-600'>$1</span>"
  );

  return (
    <section className="py-20 bg-white text-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            <span
              dangerouslySetInnerHTML={{ __html: paintedHeading }}
              className="[&_span]:text-blue-600"
            />
            <span className="text-red-600">{":"}</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="mt-2 text-zinc-500 md:text-lg"
          >
            {subheading}
          </motion.p>

          {/* Grid de bonos */}
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {items.map((b, i) => (
              <motion.article key={i} variants={fadeInUp} className="text-left">
                {/* Imagen grande con título en la franja inferior */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-zinc-200 bg-white">
                  <div
                    className="relative w-full"
                    style={{ height: `${imageHeight}px` }}
                  >
                    <img
                      src={b.imageSrc}
                      alt={b.imageAlt || b.title}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {/* tira inferior para el título */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white">
                      <div className="px-4 py-3">
                        <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide">
                          {b.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción debajo (permite <strong> con descHtml) */}
                {b.descHtml && (
                  <p
                    className="mt-4 text-zinc-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: b.descHtml }}
                  />
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
