"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function Program({
  highlight,
  bullets = [],
  imageSrc = "/images/program.png", // placeholder
  imageAlt = "Vista previa del programa",
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 md:grid-cols-12"
        >
          {/* Izquierda: Imagen grande para no dejar hueco */}
          <motion.div variants={fadeInUp} className="md:col-span-6">
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div className="relative h-[260px] sm:h-[320px] md:h-[420px]">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  {/* Overlay suave para dar look dramático */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Derecha: Título grande + bullets */}
          <motion.div variants={fadeInUp} className="md:col-span-6 md:pl-6">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {/* Resalta algunas palabras para acercarlo al look de la referencia */}
              {highlight
                ?.replaceAll("+421", "<span class='text-sky-400'>+421</span>")
                ?.replaceAll("Calistenia", "<span class='text-sky-400'>Calistenia</span>")
                ?.replaceAll("paquete", "<span class='text-sky-400'>paquete</span>")
                ?.replaceAll("Paquete", "<span class='text-sky-400'>Paquete</span>")
                ? (
                  <span
                    className="[&_span]:text-sky-400"
                    dangerouslySetInnerHTML={{
                      __html: highlight
                        .replaceAll("+421", "<span class='text-sky-400'>+421</span>")
                        .replaceAll("Calistenia", "<span class='text-sky-400'>Calistenia</span>")
                        .replaceAll("paquete", "<span class='text-sky-400'>paquete</span>")
                        .replaceAll("Paquete", "<span class='text-sky-400'>Paquete</span>"),
                    }}
                  />
                ) : (
                  highlight
                )}
            </h2>

            <ul className="mt-6 space-y-3 text-zinc-300 text-lg">
              {bullets.map((b, i) => (
                <li key={i} className="leading-relaxed">
                  • {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
