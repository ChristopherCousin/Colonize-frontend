"use client";

import { motion } from "framer-motion";
import type { User, Stats } from "@/types";

interface ProfileCardProps {
  user: User;
  stats: Stats | null;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getGenderIcon(gender: string): string {
  if (gender === "male") return "♂️";
  if (gender === "female") return "♀️";
  return "⚧️";
}

function getRank(total: number): { title: string; emoji: string } {
  if (total === 0) return { title: "Novato", emoji: "🐣" };
  if (total <= 3) return { title: "Explorador", emoji: "🧭" };
  if (total <= 10) return { title: "Aventurero", emoji: "⚔️" };
  if (total <= 25) return { title: "Conquistador", emoji: "👑" };
  if (total <= 50) return { title: "Emperador", emoji: "🏛️" };
  return { title: "Leyenda", emoji: "🔱" };
}

export default function ProfileCard({ user, stats }: ProfileCardProps) {
  const rank = getRank(stats?.total_encounters || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-neon-purple/20">
            {getInitials(user.display_name)}
          </div>
          <span className="absolute -bottom-1 -right-1 text-lg">
            {getGenderIcon(user.gender)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate">
            {user.display_name}
          </h2>
          <p className="text-sm text-gray-400">@{user.username}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm">{rank.emoji}</span>
            <span className="text-xs font-semibold text-neon-purple">
              {rank.title}
            </span>
          </div>
        </div>

        {/* Quick stat */}
        <div className="text-center">
          <p className="text-2xl font-display font-bold gradient-text">
            {stats?.total_encounters || 0}
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">
            Total
          </p>
        </div>
      </div>
    </motion.div>
  );
}
