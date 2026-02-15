"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative py-24 px-6">
      {/* Gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-gradient-to-r from-neon-purple/20 via-neon-pink/15 to-neon-cyan/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          ¿Listo para{" "}
          <span className="gradient-text">conquistar el mundo</span>?
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Crea tu cuenta en 10 segundos. Gratis. Para siempre.
        </p>
        <Link
          href="/register"
          className="inline-block px-10 py-5 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-xl glow-purple hover:opacity-90 transition-all hover:scale-105"
        >
          Empieza Ahora 🌍
        </Link>

        <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm">Gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm">Sin anuncios</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm">100% privado</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
