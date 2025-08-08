"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, QrCode, Barcode, ShieldCheck } from "lucide-react";

export default function Hero({
  badge,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  backgroundImage = "/images/hero-bg.jpg"
}) {
  const paymentIcons = [
    { Icon: CreditCard, label: "Tarjeta de crédito" },
    { Icon: DollarSign, label: "Pagos internacionales" },
    { Icon: Barcode, label: "Boleto" },
    { Icon: ShieldCheck, label: "Pago seguro" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay rojo a negro */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-black/80 to-black/95" />

      <div className="container relative mx-auto px-6 pt-20 pb-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge opcional */}
          {badge && (
            <motion.div variants={fadeInUp}>
              <span className="inline-block bg-white/10 text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Título con palabra destacada */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            {title.split(" ").map((word, idx) =>
              word.toLowerCase().includes("calistenia") ? (
                <span key={idx} className="text-sky-400">
                  {word + " "}
                </span>
              ) : (
                word + " "
              )
            )}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg md:text-xl text-zinc-100"
          >
            {subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg rounded-lg w-full md:w-auto"
            >
              <a href={ctaHref} aria-label={ctaLabel}>
                {ctaLabel}
              </a>
            </Button>
          </motion.div>

          {/* Íconos de pago */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap justify-center items-center gap-6"
          >
            {paymentIcons.map(({ Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center text-zinc-300">
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
