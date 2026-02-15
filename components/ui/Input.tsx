"use client";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl
          bg-dark-700/50 border border-white/10
          text-white placeholder-gray-500
          focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30
          transition-all duration-200
          ${error ? "border-red-500/50" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
