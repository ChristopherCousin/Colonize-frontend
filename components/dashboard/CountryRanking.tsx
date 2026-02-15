"use client";

import { motion } from "framer-motion";
import { getFlag } from "@/lib/countries";
import type { CountryStats } from "@/types";

interface CountryRankingProps {
  countries: CountryStats[];
}

export default function CountryRanking({ countries }: CountryRankingProps) {
  if (countries.length === 0) return null;

  const maxCount = countries[0]?.count || 1;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-bold text-white mb-4">
        Ranking de Países 🏆
      </h3>
      {countries.slice(0, 10).map((country, i) => (
        <motion.div
          key={country.country_code}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-3"
        >
          <span className="text-xl w-8 text-center">
            {getFlag(country.country_code)}
          </span>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{country.country_name}</span>
              <span className="text-neon-purple font-bold">{country.count}</span>
            </div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(country.count / maxCount) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-pink"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
