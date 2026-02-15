"use client";

import { motion } from "framer-motion";
import type { Stats } from "@/types";

interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  check: (stats: Stats) => boolean;
}

const BADGES: Badge[] = [
  {
    id: "first",
    emoji: "🎯",
    title: "Primera Vez",
    description: "Registra tu primera conquista",
    check: (s) => s.total_encounters >= 1,
  },
  {
    id: "explorer",
    emoji: "🧭",
    title: "Explorador",
    description: "Conquista en 3 países diferentes",
    check: (s) => s.total_countries >= 3,
  },
  {
    id: "five",
    emoji: "🖐️",
    title: "High Five",
    description: "5 conquistas totales",
    check: (s) => s.total_encounters >= 5,
  },
  {
    id: "traveler",
    emoji: "✈️",
    title: "Trotamundos",
    description: "Conquista en 5 países",
    check: (s) => s.total_countries >= 5,
  },
  {
    id: "ten",
    emoji: "🔟",
    title: "Doble Dígito",
    description: "10 conquistas totales",
    check: (s) => s.total_encounters >= 10,
  },
  {
    id: "continental",
    emoji: "🌍",
    title: "Continental",
    description: "Conquista en 10 países",
    check: (s) => s.total_countries >= 10,
  },
  {
    id: "conqueror",
    emoji: "👑",
    title: "Conquistador",
    description: "25 conquistas totales",
    check: (s) => s.total_encounters >= 25,
  },
  {
    id: "legend",
    emoji: "🔱",
    title: "Leyenda",
    description: "50 conquistas totales",
    check: (s) => s.total_encounters >= 50,
  },
];

interface AchievementBadgesProps {
  stats: Stats | null;
}

export default function AchievementBadges({ stats }: AchievementBadgesProps) {
  if (!stats) return null;

  const unlocked = BADGES.filter((b) => b.check(stats));
  const locked = BADGES.filter((b) => !b.check(stats));

  return (
    <div>
      <h3 className="text-lg font-display font-bold text-white mb-4">
        Logros 🏆
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {/* Unlocked */}
        {unlocked.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: i * 0.1, stiffness: 200 }}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl glass border border-neon-purple/20 glow-purple"
            title={`${badge.title}: ${badge.description}`}
          >
            <span className="text-2xl">{badge.emoji}</span>
            <span className="text-[9px] text-gray-300 text-center leading-tight font-medium">
              {badge.title}
            </span>
          </motion.div>
        ))}

        {/* Locked */}
        {locked.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-dark-700/30 border border-white/5 opacity-30"
            title={`🔒 ${badge.title}: ${badge.description}`}
          >
            <span className="text-2xl grayscale">🔒</span>
            <span className="text-[9px] text-gray-500 text-center leading-tight">
              ???
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
