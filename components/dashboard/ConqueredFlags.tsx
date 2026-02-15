"use client";

import { motion } from "framer-motion";
import { getFlag } from "@/lib/countries";
import type { CountryStats } from "@/types";

interface ConqueredFlagsProps {
  countries: CountryStats[];
}

export default function ConqueredFlags({ countries }: ConqueredFlagsProps) {
  if (countries.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-3xl mb-2">🏳️</p>
        <p className="text-sm text-gray-500">
          Aún no has conquistado ningún país
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-display font-bold text-white mb-4">
        Territorios Conquistados 🏴‍☠️
      </h3>
      <div className="flex flex-wrap gap-2">
        {countries.map((country, i) => (
          <motion.div
            key={country.country_code}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              delay: i * 0.05,
              stiffness: 300,
              damping: 20,
            }}
            className="group relative"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 hover:border-neon-purple/30 transition-all cursor-default">
              <span className="text-lg">{getFlag(country.country_code)}</span>
              <span className="text-xs text-gray-300 font-medium">
                {country.country_name}
              </span>
              {country.count > 1 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple font-bold">
                  ×{country.count}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
