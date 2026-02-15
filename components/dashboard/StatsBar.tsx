"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import GlassCard from "@/components/ui/GlassCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import type { Stats } from "@/types";

interface StatsBarProps {
  stats: Stats | null;
}

const TOTAL_COUNTRIES = 195;

export default function StatsBar({ stats }: StatsBarProps) {
  if (!stats) return null;

  const percentage = Math.round((stats.total_countries / TOTAL_COUNTRIES) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Conquistas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <GlassCard glow="pink" className="text-center h-full">
          <span className="text-3xl mb-2 block">🔥</span>
          <p className="text-4xl font-display font-bold text-white">
            <CountUp end={stats.total_encounters} duration={2} />
          </p>
          <p className="text-sm text-gray-400 mt-1">Conquistas</p>
        </GlassCard>
      </motion.div>

      {/* Países */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="purple" className="text-center h-full">
          <span className="text-3xl mb-2 block">🌍</span>
          <p className="text-4xl font-display font-bold text-white">
            <CountUp end={stats.total_countries} duration={2} />
          </p>
          <p className="text-sm text-gray-400 mt-1">Países</p>
        </GlassCard>
      </motion.div>

      {/* Media por país */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard glow="cyan" className="text-center h-full">
          <span className="text-3xl mb-2 block">📈</span>
          <p className="text-4xl font-display font-bold text-white">
            {stats.total_countries > 0
              ? (stats.total_encounters / stats.total_countries).toFixed(1)
              : "0"}
          </p>
          <p className="text-sm text-gray-400 mt-1">Media/País</p>
        </GlassCard>
      </motion.div>

      {/* Progress Ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="flex items-center justify-center h-full">
          <ProgressRing
            percentage={percentage}
            size={120}
            strokeWidth={7}
            label="del mundo conquistado"
          />
        </GlassCard>
      </motion.div>
    </div>
  );
}
