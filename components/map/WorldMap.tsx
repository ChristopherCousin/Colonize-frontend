"use client";

import { memo, useState, useCallback, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import MapControls from "./MapControls";
import MapLegend from "./MapLegend";
import type { CountryStats, Encounter } from "@/types";
import { NUM_TO_ALPHA2 } from "@/lib/countryMapping";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

interface WorldMapProps {
  conqueredCountries: CountryStats[];
  encounters: Encounter[];
  onCountryClick?: (countryCode: string, countryName: string) => void;
}

interface TooltipData {
  name: string;
  count: number;
}

function getColorByCount(count: number): string {
  if (count === 0) return "#12121e";
  if (count === 1) return "#7c3aed";
  if (count <= 3) return "#a855f7";
  if (count <= 5) return "#d946ef";
  if (count <= 10) return "#ec4899";
  return "#f43f5e";
}

function WorldMap({ conqueredCountries, encounters, onCountryClick }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const mapRef = useRef<HTMLDivElement>(null);

  const countryMap = new Map(
    conqueredCountries.map((c) => [c.country_code, c])
  );

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z * 1.5, MAX_ZOOM)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z / 1.5, MIN_ZOOM)), []);
  const handleReset = useCallback(() => { setZoom(1); setCenter([0, 20]); }, []);

  const filterZoomEvent = useCallback((event: { type?: string; ctrlKey?: boolean; button?: number }) => {
    if (event?.type === "wheel") {
      return Boolean(event.ctrlKey);
    }
    return !event?.button;
  }, []);

  const handleWheelCapture = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      // Block browser zoom while preserving map zoom behavior.
      event.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={mapRef}
      className="relative w-full rounded-2xl overflow-hidden glass border border-white/5"
      onMouseMove={handleMouseMove}
      onWheelCapture={handleWheelCapture}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 via-transparent to-neon-pink/5 pointer-events-none z-0" />

      <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
      <MapLegend />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [0, 30] }}
        className="w-full h-auto"
        style={{ background: "transparent" }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          filterZoomEvent={filterZoomEvent}
          onMoveEnd={({ coordinates, zoom: z }) => {
            setCenter(coordinates as [number, number]);
            setZoom(z);
          }}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const alpha2 = NUM_TO_ALPHA2[geo.id || ""] || "";
                const stats = countryMap.get(alpha2);
                const count = stats?.count || 0;
                const name = stats?.country_name || geo.properties.name || "Desconocido";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setTooltip({ name, count })}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (count > 0 && onCountryClick) {
                        onCountryClick(alpha2, name);
                      }
                    }}
                    style={{
                      default: {
                        fill: getColorByCount(count),
                        stroke: count > 0 ? "rgba(168,85,247,0.3)" : "#0a0a14",
                        strokeWidth: count > 0 ? 0.8 : 0.3,
                        transition: "all 0.4s ease",
                      },
                      hover: {
                        fill: count > 0 ? "#f472b6" : "#1e1e36",
                        stroke: count > 0 ? "#ec4899" : "#2a2a44",
                        strokeWidth: 1,
                        cursor: count > 0 ? "pointer" : "default",
                      },
                      pressed: { fill: "#a855f7" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip — anchored inside the map container */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute z-20 glass rounded-xl px-4 py-2.5 pointer-events-none border border-white/10 whitespace-nowrap"
            style={{
              left: Math.min(tooltipPos.x + 14, (mapRef.current?.clientWidth || 800) - 180),
              top: Math.max(tooltipPos.y - 55, 10),
            }}
          >
            <p className="text-sm font-bold text-white">{tooltip.name}</p>
            <p className="text-xs text-neon-pink">
              {tooltip.count > 0
                ? `${tooltip.count} conquista${tooltip.count > 1 ? "s" : ""} 🔥 · Click para ver`
                : "Territorio virgen 🗺️"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(WorldMap);
