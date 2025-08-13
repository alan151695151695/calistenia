"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { fadeInUp, staggerContainer } from "../lib/anim";

export default function CTA({ title, subtitle, ctaLabel, ctaHref }) {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold"
          >
            {title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-2 text-zinc-300">
            {subtitle}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6">
            <Button size="lg" asChild>
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
