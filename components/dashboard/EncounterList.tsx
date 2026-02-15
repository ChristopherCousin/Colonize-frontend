"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFlag } from "@/lib/countries";
import { uploadsApi } from "@/services/api";
import type { Encounter } from "@/types";

interface EncounterListProps {
  encounters: Encounter[];
  onDelete: (id: string) => void;
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

function EncounterCard({
  encounter,
  onDelete,
  onEdit,
}: {
  encounter: Encounter;
  onDelete: (id: string) => void;
  onEdit: (encounter: Encounter) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const photoUrl = uploadsApi.getPhotoUrl(encounter.photo_url);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      onClick={() => setExpanded(!expanded)}
      className="glass rounded-xl overflow-hidden cursor-pointer group hover:border-neon-purple/20 transition-all"
    >
      <div className="flex items-center gap-4 p-4">
        {/* Photo thumbnail or flag */}
        {photoUrl ? (
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-purple/30 flex-shrink-0">
            <img src={photoUrl} alt={encounter.nickname} className="w-full h-full object-cover" />
          </div>
        ) : (
          <span className="text-3xl flex-shrink-0">{getFlag(encounter.country_code)}</span>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white truncate">{encounter.nickname}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-gray-300">
              {encounter.gender === "male" ? "♂" : encounter.gender === "female" ? "♀" : "✨"}
            </span>
          </div>
          <p className="text-sm text-gray-400 truncate">
            {getFlag(encounter.country_code)} {encounter.country_name}
            {encounter.city ? ` · ${encounter.city}` : ""}
          </p>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <span className="text-sm whitespace-nowrap">{renderRating(encounter.rating)}</span>
          <span className="text-[11px] text-gray-500">{formatDate(encounter.date)}</span>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-4 space-y-3">
              {/* Full photo */}
              {photoUrl && (
                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10">
                  <img src={photoUrl} alt={encounter.nickname} className="w-full h-full object-cover" />
                </div>
              )}

              {encounter.notes && (
                <p className="text-sm text-gray-300 italic border-l-2 border-neon-purple/30 pl-3">
                  &ldquo;{encounter.notes}&rdquo;
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Registrado el {formatDate(encounter.created_at)}
                </span>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onEdit(encounter)}
                    className="text-xs text-neon-purple hover:text-neon-pink transition-colors font-medium"
                  >
                    ✏️ Editar
                  </button>
                  {!confirmDelete ? (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-400">¿Seguro?</span>
                      <button
                        onClick={() => onDelete(encounter.id)}
                        className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400"
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EncounterList({ encounters, onDelete, onEdit }: EncounterListProps) {
  if (encounters.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-5xl mb-4">🗺️</p>
        <p className="text-lg font-medium">Tu mapa está vacío</p>
        <p className="text-sm mt-1">¡Empieza a conquistar el mundo!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
      <AnimatePresence mode="popLayout">
        {encounters.map((enc) => (
          <EncounterCard key={enc.id} encounter={enc} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </AnimatePresence>
    </div>
  );
}
