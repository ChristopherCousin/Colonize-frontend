"use client";

import { motion } from "framer-motion";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  const btnClass =
    "w-10 h-10 flex items-center justify-center rounded-lg glass text-gray-300 hover:text-white hover:bg-white/10 transition-all text-lg font-bold";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 right-4 flex flex-col gap-2 z-10"
    >
      <button onClick={onZoomIn} className={btnClass} title="Zoom in">
        +
      </button>
      <button onClick={onZoomOut} className={btnClass} title="Zoom out">
        −
      </button>
      <button onClick={onReset} className={btnClass} title="Reset">
        ⟲
      </button>
    </motion.div>
  );
}
