"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFlag } from "@/lib/countries";

interface ConquestCelebrationProps {
  isVisible: boolean;
  countryCode: string;
  countryName: string;
  nickname: string;
  rating: number;
  isNewCountry: boolean;
  onComplete: () => void;
}

export default function ConquestCelebration({
  isVisible,
  countryCode,
  countryName,
  nickname,
  rating,
  isNewCountry,
  onComplete,
}: ConquestCelebrationProps) {
  const [phase, setPhase] = useState<"idle" | "pulse" | "card" | "done">("idle");

  useEffect(() => {
    if (!isVisible) {
      setPhase("idle");
      return;
    }
    setPhase("pulse");
    const t1 = setTimeout(() => setPhase("card"), 600);
    const t2 = setTimeout(() => setPhase("done"), 3800);
    const t3 = setTimeout(() => onComplete(), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isVisible, onComplete]);

  const flag = getFlag(countryCode);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
        >
          {/* Darkened backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Expanding pulse rings */}
          {(phase === "pulse" || phase === "card") && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                  className="absolute w-32 h-32 rounded-full border-2 border-neon-purple/40"
                />
              ))}
              {/* Center glow */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-pink/40 blur-xl"
              />
            </>
          )}

          {/* Conquest card */}
          {(phase === "card" || phase === "done") && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 30 }}
              animate={{
                scale: phase === "done" ? [1, 1.02, 0.9] : 1,
                opacity: phase === "done" ? [1, 1, 0] : 1,
                y: phase === "done" ? [0, 0, -20] : 0,
              }}
              transition={{
                duration: phase === "done" ? 0.4 : 0.5,
                type: phase === "done" ? "tween" : "spring",
                damping: 20,
                stiffness: 200,
              }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Flag — big and epic */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.1, stiffness: 300 }}
                className="text-8xl mb-4 drop-shadow-2xl"
              >
                {flag}
              </motion.div>

              {/* Glass card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-2xl px-10 py-6 text-center border border-white/10 glow-purple max-w-sm"
              >
                {isNewCountry && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-3"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                      Nuevo Territorio
                    </span>
                  </motion.div>
                )}

                <h2 className="text-2xl font-display font-bold text-white mb-1">
                  {countryName}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  Conquistado con <span className="text-white font-medium">{nickname}</span>
                </p>

                {/* Rating with staggered animation */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      className="text-2xl"
                    >
                      🔥
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Conquest text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-gray-500 mt-4 uppercase tracking-widest"
              >
                Territorio Conquistado
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
