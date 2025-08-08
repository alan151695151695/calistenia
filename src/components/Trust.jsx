"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";
// Íconos lucide
import { ShieldCheck, Coins, Mail } from "lucide-react";

const ICON_MAP = {
  shield: ShieldCheck,
  coins: Coins,
  mail: Mail,
};

export default function Trust({
  headingHtml = "¿Tienes dudas sobre <span class='text-sky-600'>comprar por internet</span>?",
  subtitle = "Tranquilo: adquirir nuestro curso es fácil y confiable.",
  items = [
    {
      icon: "shield",
      text: "Datos personales seguros y nunca compartidos. Compra con tranquilidad.",
    },
    {
      icon: "coins",
      text: "Pago automático, rápido y con total seguridad para ti.",
    },
    {
      icon: "mail",
      text: "Acceso a tu área de alumno directamente desde tu email.",
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
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
            dangerouslySetInnerHTML={{ __html: headingHtml }}
          />
          {/* Subheading */}
          <motion.p variants={fadeInUp} className="mt-2 text-zinc-500 md:text-lg">
            {subtitle}
          </motion.p>

          {/* Pills */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {items.map((it, i) => {
              const Icon = ICON_MAP[it.icon] || ShieldCheck;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-4 rounded-2xl bg-zinc-100 px-6 py-5 shadow-sm"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                    <Icon className="h-6 w-6 text-white" />
                  </span>
                  <p className="text-zinc-700 text-left leading-relaxed">{it.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
