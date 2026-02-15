"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getFlag } from "@/lib/countries";
import { uploadsApi } from "@/services/api";
import type { Encounter } from "@/types";

interface CountryDetailPanelProps {
  isOpen: boolean;
  countryCode: string;
  countryName: string;
  encounters: Encounter[];
  onClose: () => void;
  onEdit: (encounter: Encounter) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function renderRating(rating: number | null): string {
  if (!rating) return "";
  return "🔥".repeat(rating);
}

export default function CountryDetailPanel({
  isOpen,
  countryCode,
  countryName,
  encounters,
  onClose,
  onEdit,
}: CountryDetailPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glass border-l border-white/10 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 glass border-b border-white/5 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getFlag(countryCode)}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{countryName}</h2>
                    <p className="text-sm text-neon-pink font-medium">
                      {encounters.length} conquista{encounters.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Encounters */}
            <div className="p-6 space-y-4">
              {encounters.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Territorio virgen 🗺️</p>
              ) : (
                encounters.map((enc, i) => {
                  const photoUrl = uploadsApi.getPhotoUrl(enc.photo_url);
                  return (
                    <motion.div
                      key={enc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl overflow-hidden group"
                    >
                      {/* Photo */}
                      {photoUrl && (
                        <div className="w-full h-44 overflow-hidden">
                          <img
                            src={photoUrl}
                            alt={enc.nickname}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-white text-lg">{enc.nickname}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple">
                              {enc.gender === "male" ? "♂" : enc.gender === "female" ? "♀" : "⚧"}
                            </span>
                          </div>
                          <span>{renderRating(enc.rating)}</span>
                        </div>

                        <div className="flex gap-4 text-sm">
                          {enc.city && (
                            <div>
                              <span className="text-gray-500">📍 </span>
                              <span className="text-gray-200">{enc.city}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-500">📅 </span>
                            <span className="text-gray-200">{formatDate(enc.date)}</span>
                          </div>
                        </div>

                        {enc.notes && (
                          <p className="text-sm text-gray-400 italic border-l-2 border-neon-purple/30 pl-3">
                            {enc.notes}
                          </p>
                        )}

                        <button
                          onClick={() => onEdit(enc)}
                          className="text-xs text-neon-purple hover:text-neon-pink transition-colors font-medium opacity-0 group-hover:opacity-100"
                        >
                          ✏️ Editar
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
