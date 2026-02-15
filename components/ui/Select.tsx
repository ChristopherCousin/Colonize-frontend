"use client";

import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl
          bg-dark-700/50 border border-white/10
          text-white
          focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30
          transition-all duration-200 appearance-none
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-dark-800">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
