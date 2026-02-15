"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { uploadsApi } from "@/services/api";

interface PhotoUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [objectPos, setObjectPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const previewUrl = value ? uploadsApi.getPhotoUrl(value) : null;

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten imágenes");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Máximo 5MB");
        return;
      }
      setUploading(true);
      try {
        const url = await uploadsApi.uploadPhoto(file);
        onChange(url);
        setObjectPos({ x: 50, y: 50 });
      } catch (err: any) {
        setError(err.message || "Error subiendo foto");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  /* ── Drag to reposition focal point ── */
  const handlePointerDown = useCallback(() => setIsDragging(true), []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !imgContainerRef.current) return;
      const rect = imgContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setObjectPos({ x, y });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-300">Foto (opcional)</label>

      {previewUrl ? (
        <div className="space-y-2">
          {/* Image preview — 4:3 fixed ratio */}
          <div
            ref={imgContainerRef}
            className="relative w-full rounded-xl overflow-hidden border border-white/10 cursor-move select-none"
            style={{ aspectRatio: "4/3" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <img
              src={previewUrl}
              alt="Preview"
              draggable={false}
              className="w-full h-full object-cover transition-[object-position] duration-100"
              style={{ objectPosition: `${objectPos.x}% ${objectPos.y}%` }}
            />
            {/* Reposition hint */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                Arrastra para reposicionar
              </span>
            </div>
            {/* Focal point indicator */}
            {isDragging && (
              <div
                className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg pointer-events-none"
                style={{ left: `${objectPos.x}%`, top: `${objectPos.y}%` }}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 text-xs py-2 rounded-lg glass text-gray-300 hover:text-white font-medium transition-colors"
            >
              📷 Cambiar foto
            </button>
            <button
              type="button"
              onClick={() => { onChange(null); setObjectPos({ x: 50, y: 50 }); }}
              className="text-xs py-2 px-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 font-medium transition-colors"
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            w-full rounded-xl border-2 border-dashed cursor-pointer
            flex flex-col items-center justify-center gap-2 transition-all
            ${dragOver
              ? "border-neon-purple bg-neon-purple/10 py-10"
              : "border-white/10 hover:border-neon-purple/40 hover:bg-white/[0.02] py-8"}
          `}
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
          ) : (
            <>
              <span className="text-2xl">📸</span>
              <p className="text-sm text-gray-400">
                Arrastra una foto o <span className="text-neon-purple">haz click</span>
              </p>
              <p className="text-[10px] text-gray-600">JPG, PNG, WebP · Max 5MB</p>
            </>
          )}
        </motion.div>
      )}

      {error && <span className="text-xs text-red-400">{error}</span>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
    </div>
  );
}
