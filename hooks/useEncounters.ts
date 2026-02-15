"use client";

import { useCallback, useEffect, useState } from "react";
import { encountersApi } from "@/services/api";
import type { Encounter, EncounterCreate, EncounterUpdate, Stats } from "@/types";

export function useEncounters() {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [enc, st] = await Promise.all([
        encountersApi.list(),
        encountersApi.stats(),
      ]);
      setEncounters(enc);
      setStats(st);
    } catch (err) {
      console.error("Error loading encounters:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addEncounter = async (data: EncounterCreate) => {
    const created = await encountersApi.create(data);
    await refresh();
    return created;
  };

  const updateEncounter = async (id: string, data: EncounterUpdate) => {
    const updated = await encountersApi.update(id, data);
    await refresh();
    return updated;
  };

  const removeEncounter = async (id: string) => {
    await encountersApi.delete(id);
    await refresh();
  };

  /** Filter encounters by country code */
  const getByCountry = useCallback(
    (countryCode: string) =>
      encounters.filter((e) => e.country_code === countryCode),
    [encounters]
  );

  return {
    encounters,
    stats,
    loading,
    refresh,
    addEncounter,
    updateEncounter,
    removeEncounter,
    getByCountry,
  };
}
