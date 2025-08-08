"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/anim";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, BadgeDollarSign, Barcode } from "lucide-react";

export default function Pricing({
  eyebrowTop = "Oferta Especial",
  eyebrowBlue = "¡Por tiempo limitado!",
  originalPrice = "de R$ 159,90",
  preface = "por apenas",
  priceLabel = "R$ 19,90",
  installmentText = "o 4x de R$ 10,60",
  ctaLabel = "Sí, quiero empezar ahora",
  ctaHref = "/checkout",
  showPayments = true,
}) {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrows */}
          <motion.p variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {eyebrowTop}
          </motion.p>
          <motion.p variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-sky-500">
            {eyebrowBlue}
          </motion.p>

          {/* Línea tachada */}
          <motion.p variants={fadeInUp} className="mt-4 text-zinc-300">
            <span className="line-through">{originalPrice}</span> {preface}
          </motion.p>

          {/* Precio grande con “Por apenas” y pastilla azul */}
          <motion.p variants={fadeInUp} className="mt-3 text-3xl md:text-5xl font-extrabold">
            Por apenas{" "}
            <span className="inline-block rounded-md bg-sky-600 px-3 md:px-4 py-1 md:py-2 text-white">
              {priceLabel}
            </span>
          </motion.p>

          {/* Cuotas */}
          <motion.p variants={fadeInUp} className="mt-2 text-zinc-300">
            
          </motion.p>

          {/* CTA rojo grande */}
          <motion.div variants={fadeInUp} className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg w-full max-w-xl mx-auto rounded-lg"
            >
              <a href={ctaHref} aria-label={ctaLabel}>{ctaLabel}</a>
            </Button>
          </motion.div>

          {/* Métodos de pago (íconos lucide) */}
          {showPayments && (
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-6 text-zinc-200"
            >
              <div className="flex items-center gap-2">
                <QrCode className="h-6 w-6" /> <span className="text-sm">Pix / QR</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6" /> <span className="text-sm">Visa / Master / Amex</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="h-6 w-6" /> <span className="text-sm">Pago seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Barcode className="h-6 w-6" /> <span className="text-sm">Boleto</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
