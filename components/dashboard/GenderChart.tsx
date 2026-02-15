"use client";

import { motion } from "framer-motion";

interface GenderChartProps {
  byGender: Record<string, number>;
  total: number;
}

const GENDER_CONFIG: Record<string, { color: string; label: string; icon: string }> = {
  male: { color: "#6366f1", label: "Chicos", icon: "♂️" },
  female: { color: "#ec4899", label: "Chicas", icon: "♀️" },
  other: { color: "#06b6d4", label: "Otros", icon: "✨" },
};

export default function GenderChart({ byGender, total }: GenderChartProps) {
  if (total === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        Sin datos todavía
      </div>
    );
  }

  const entries = Object.entries(byGender).sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display font-bold text-white">
        Por Género 🎯
      </h3>

      {/* Bars */}
      <div className="space-y-3">
        {entries.map(([gender, count], i) => {
          const config = GENDER_CONFIG[gender] || {
            color: "#94a3b8",
            label: gender,
            icon: "❓",
          };
          const pct = Math.round((count / total) * 100);

          return (
            <div key={gender}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{config.icon}</span>
                  <span className="text-sm text-gray-300">{config.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{count}</span>
                  <span className="text-xs text-gray-500">({pct}%)</span>
                </div>
              </div>
              <div className="h-2.5 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: config.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Donut mini */}
      <div className="flex justify-center pt-2">
        <svg width="80" height="80" viewBox="0 0 80 80">
          {entries.reduce<{ elements: JSX.Element[]; offset: number }>(
            (acc, [gender, count], i) => {
              const config = GENDER_CONFIG[gender] || { color: "#94a3b8" };
              const pct = (count / total) * 100;
              const dash = (pct / 100) * 226; // circumference for r=36
              acc.elements.push(
                <motion.circle
                  key={gender}
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke={config.color}
                  strokeWidth="7"
                  strokeDasharray={`${dash} ${226 - dash}`}
                  strokeDashoffset={-acc.offset}
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="-rotate-90 origin-center"
                />
              );
              acc.offset += dash;
              return acc;
            },
            { elements: [], offset: 0 }
          ).elements}
          <text
            x="40"
            y="40"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white text-xs font-bold"
          >
            {total}
          </text>
        </svg>
      </div>
    </div>
  );
}
