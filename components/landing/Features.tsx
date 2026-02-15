"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🗺️",
    title: "Mapa Interactivo",
    description:
      "Visualiza tus conquistas en un mapa mundial con zoom, colores por intensidad y marcadores de ciudades.",
    gradient: "from-neon-purple to-indigo-500",
  },
  {
    icon: "🔥",
    title: "Registra Todo",
    description:
      "Nombre, país de origen, ciudad donde fue, fecha, rating... cada detalle importa.",
    gradient: "from-neon-pink to-rose-500",
  },
  {
    icon: "📊",
    title: "Estadísticas",
    description:
      "Porcentaje del mundo conquistado, desglose por género, ranking de países favoritos.",
    gradient: "from-neon-cyan to-blue-500",
  },
  {
    icon: "🏆",
    title: "Logros",
    description:
      "Desbloquea badges: Explorador, Trotamundos, Conquistador, Leyenda... ¿hasta dónde llegarás?",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: "🔒",
    title: "100% Privado",
    description:
      "Tu mapa es solo tuyo. Nadie puede ver tus conquistas a menos que tú lo compartas.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: "🏴‍☠️",
    title: "Banderas de Guerra",
    description:
      "Colecciona las banderas de cada país que conquistas. ¿Cuántas llevas?",
    gradient: "from-violet-400 to-purple-600",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">¿Qué puedes hacer?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Todo lo que necesitas para llevar el control de tus conquistas mundiales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/5 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
