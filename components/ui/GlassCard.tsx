"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "purple" | "pink" | "cyan" | "none";
  hover?: boolean;
}

const glowClasses = {
  purple: "glow-purple",
  pink: "glow-pink",
  cyan: "glow-cyan",
  none: "",
};

export default function GlassCard({
  children,
  className = "",
  glow = "none",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        glass rounded-2xl p-6
        ${glowClasses[glow]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
