"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const floatingFlags = ["🇪🇸", "🇫🇷", "🇮🇹", "🇧🇷", "🇯🇵", "🇺🇸", "🇬🇧", "🇩🇪", "🇲🇽", "🇦🇷", "🇨🇴", "🇹🇭"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-pink/15 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px] animate-pulse-glow" />

      {/* Floating flags */}
      {floatingFlags.map((flag, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl opacity-20 select-none"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000) - 500,
            y: Math.random() * 600 - 300,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 11) % 60}%`,
          }}
        >
          {flag}
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
            <span className="gradient-text">COLONIZE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
            Tu mapa personal de conquistas
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-md mx-auto">
            Registra cada encuentro, marca cada país, presume tu mapa. 
            ¿Cuántos territorios has conquistado?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg glow-purple hover:opacity-90 transition-opacity"
          >
            Empieza a Conquistar 🔥
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-xl glass border-neon-purple/30 text-gray-300 font-medium text-lg hover:bg-white/5 transition-colors"
          >
            Ya tengo cuenta
          </Link>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: "195", label: "Países" },
            { value: "∞", label: "Conquistas" },
            { value: "100%", label: "Privado" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
