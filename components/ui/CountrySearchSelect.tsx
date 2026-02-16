"use client";

import { useState, useRef, useEffect } from "react";
import { COUNTRIES, filterCountries, getCountryByCode } from "@/lib/countries";
import type { CountryInfo } from "@/lib/countries";

const LABEL_COUNTRY = "País de origen";
const PLACEHOLDER_SEARCH = "Buscar país...";
const MAX_DROPDOWN_HEIGHT = 280;

interface CountrySearchSelectProps {
  label?: string;
  value: string;
  onChange: (countryCode: string) => void;
  className?: string;
}

export default function CountrySearchSelect({
  label = LABEL_COUNTRY,
  value,
  onChange,
  className = "",
}: CountrySearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = getCountryByCode(value);
  const options = filterCountries(query);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (c: CountryInfo) => {
    onChange(c.code);
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          placeholder={open ? PLACEHOLDER_SEARCH : undefined}
          value={open ? query : selected ? `${selected.flag} ${selected.name}` : ""}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10
            text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple/50
            focus:ring-1 focus:ring-neon-purple/30 transition-all duration-200"
        />
        {open && (
          <ul
            className="absolute z-50 w-full mt-1 py-1 rounded-xl bg-dark-800 border border-white/10
              shadow-xl overflow-y-auto"
            style={{ maxHeight: MAX_DROPDOWN_HEIGHT }}
            role="listbox"
          >
            {options.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 text-sm">Sin resultados</li>
            ) : (
              options.map((c) => (
                <li
                  key={c.code}
                  role="option"
                  aria-selected={c.code === value}
                  onClick={() => handleSelect(c)}
                  className="px-4 py-2.5 flex items-center gap-2 cursor-pointer
                    hover:bg-white/10 text-white transition-colors"
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
