"use client";

import { motion } from "framer-motion";

const LEGEND_ITEMS = [
  { color: "#1a1a2e", label: "Sin conquistar" },
  { color: "#7c3aed", label: "1 conquista" },
  { color: "#a855f7", label: "2-3" },
  { color: "#d946ef", label: "4-5" },
  { color: "#ec4899", label: "6-10" },
  { color: "#f43f5e", label: "+10" },
];

export default function MapLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 z-10"
    >
      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-semibold">
        Intensidad
      </p>
      <div className="flex gap-1.5 items-center">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <div
              className="w-5 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[8px] text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
