"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";
import { ShieldAlert } from "lucide-react";

export default function Argument({
  eyebrow = "Calistenia sin misterio.",
  // Permite HTML para resaltar palabras en azul
  titleHtml = "LA INDUSTRIA DEL FITNESS <span class='text-sky-400'>TE MIENTE</span>…",
  leadHtml = "<strong>La mayoría de personas cree que necesita gimnasio, máquinas y suplementos para estar en forma.</strong> Déjame contarte una verdad que casi nadie dice:",
  bulletBoldHtml = "🏋️ <strong>La mayoría de ‘gym bros’ no puede hacer ni una pull-up explosiva ni aguantar un front lever 5 segundos.</strong>",
  redSubhead = "¿Y sabes por qué?",
  paragraphs = [
    "Porque están atrapados en un sistema que se enfoca solo en ‘músculo’ y descuida lo que importa: tendones fuertes, movilidad, control corporal y resistencia real.",
    "Mientras siguen dependientes de mancuernas y máquinas aisladas, con tu propio peso puedes construir un físico funcional y respetado — en cualquier lugar.",
    "Y lo peor: gastan dinero en pre-entrenos, creatina y ‘dietas milagro’ para perder grasa. Todo vendido por influencers patrocinados."
  ],
  calloutHtml = "✨ <strong>Con nuestro método, en solo 8 semanas podrías lograr habilidades que el 90% de gente de gym no consigue</strong> — y sin tirar tu dinero.",
  imageSrc = "/images/argument.jpg",
  imageAlt = "La verdad sobre la industria del fitness",
}) {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 md:grid-cols-12 items-start"
        >
          {/* Izquierda: imagen grande */}
          <motion.div variants={fadeInUp} className="md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-zinc-800 bg-zinc-900">
              <div className="relative h-[420px] md:h-[520px]">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="absolute inset-0 w-full h-full object-contain bg-zinc-900"
                />
              </div>
            </div>
          </motion.div>

          {/* Derecha: contenido */}
          <motion.div variants={fadeInUp} className="md:col-span-7">
            {/* Eyebrow */}
            <div className="text-zinc-400 text-sm mb-3 tracking-wide">
              {eyebrow}
            </div>

            {/* Título con parte en azul */}
            <h2
              className="text-3xl md:text-5xl font-extrabold leading-tight"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />

            {/* Lead en negrita */}
            <p
              className="mt-4 text-zinc-200"
              dangerouslySetInnerHTML={{ __html: leadHtml }}
            />

            {/* Bullet en negrita */}
            <p
              className="mt-4 text-white"
              dangerouslySetInnerHTML={{ __html: bulletBoldHtml }}
            />

            {/* Subtítulo rojo */}
            <p className="mt-5 font-semibold text-red-500 uppercase tracking-wide">
              {redSubhead}
            </p>

            {/* Párrafos */}
            <div className="mt-3 space-y-4 text-zinc-300">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Callout final */}
            <div className="mt-6 rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-300 flex gap-3 items-start">
              <ShieldAlert className="h-5 w-5 shrink-0 text-emerald-400" />
              <p dangerouslySetInnerHTML={{ __html: calloutHtml }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
