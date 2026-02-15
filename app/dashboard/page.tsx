"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import AuthGuard from "@/components/layout/AuthGuard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import StatsBar from "@/components/dashboard/StatsBar";
import WorldMap from "@/components/map/WorldMap";
import CountryDetailPanel from "@/components/map/CountryDetailPanel";
import EncounterList from "@/components/dashboard/EncounterList";
import CountryRanking from "@/components/dashboard/CountryRanking";
import ConqueredFlags from "@/components/dashboard/ConqueredFlags";
import GenderChart from "@/components/dashboard/GenderChart";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import AddEncounterModal from "@/components/dashboard/AddEncounterModal";
import EditEncounterModal from "@/components/dashboard/EditEncounterModal";
import ConquestCelebration from "@/components/dashboard/ConquestCelebration";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { useAuth } from "@/hooks/useAuth";
import { useEncounters } from "@/hooks/useEncounters";
import type { Encounter } from "@/types";
import type { ConquestResult } from "@/components/dashboard/AddEncounterModal";

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const {
    encounters, stats, loading,
    addEncounter, updateEncounter, removeEncounter, getByCountry,
  } = useEncounters();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEncounter, setEditingEncounter] = useState<Encounter | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string; name: string;
  } | null>(null);

  // Celebration state
  const [celebration, setCelebration] = useState<ConquestResult | null>(null);
  const [isNewCountry, setIsNewCountry] = useState(false);

  const handleCountryClick = useCallback((code: string, name: string) => {
    setSelectedCountry({ code, name });
  }, []);

  const handleEditFromPanel = useCallback((enc: Encounter) => {
    setSelectedCountry(null);
    setTimeout(() => setEditingEncounter(enc), 200);
  }, []);

  const handleConquestComplete = useCallback(
    (result: ConquestResult) => {
      const wasNew = !stats?.countries_detail.some(
        (c) => c.country_code === result.country_code
      );
      setIsNewCountry(wasNew);
      setCelebration(result);
    },
    [stats]
  );

  return (
    <AuthGuard isAuthenticated={!!user} loading={authLoading}>
      <Toaster position="top-center" />
      <Navbar user={user} onLogout={logout} />

      <main className="pt-20 pb-10 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
        {/* Row 1: Profile + Add */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="flex-1 w-full">
            {user && <ProfileCard user={user} stats={stats} />}
          </div>
          <Button onClick={() => setShowAddModal(true)} size="lg">
            + Nueva Conquista
          </Button>
        </motion.div>

        <StatsBar stats={stats} />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <WorldMap
            conqueredCountries={stats?.countries_detail || []}
            encounters={encounters}
            onCountryClick={handleCountryClick}
          />
        </motion.div>

        <GlassCard hover={false}>
          <ConqueredFlags countries={stats?.countries_detail || []} />
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard hover={false}>
              <h3 className="text-lg font-display font-bold text-white mb-4">
                Historial de Conquistas 📜
              </h3>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
                </div>
              ) : (
                <EncounterList
                  encounters={encounters}
                  onDelete={removeEncounter}
                  onEdit={setEditingEncounter}
                />
              )}
            </GlassCard>
          </div>
          <div className="space-y-6">
            <GlassCard hover={false}>
              <GenderChart
                byGender={stats?.by_gender || {}}
                total={stats?.total_encounters || 0}
              />
            </GlassCard>
            <GlassCard hover={false}>
              <CountryRanking countries={stats?.countries_detail || []} />
            </GlassCard>
          </div>
        </div>

        <GlassCard hover={false}>
          <AchievementBadges stats={stats} />
        </GlassCard>
      </main>

      {/* ── Modals, Panels & Celebration ── */}
      <AddEncounterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={async (data) => { await addEncounter(data); }}
        onConquestComplete={handleConquestComplete}
      />

      <EditEncounterModal
        encounter={editingEncounter}
        isOpen={!!editingEncounter}
        onClose={() => setEditingEncounter(null)}
        onSave={async (id, data) => { await updateEncounter(id, data); }}
      />

      <CountryDetailPanel
        isOpen={!!selectedCountry}
        countryCode={selectedCountry?.code || ""}
        countryName={selectedCountry?.name || ""}
        encounters={selectedCountry ? getByCountry(selectedCountry.code) : []}
        onClose={() => setSelectedCountry(null)}
        onEdit={handleEditFromPanel}
      />

      <ConquestCelebration
        isVisible={!!celebration}
        countryCode={celebration?.country_code || ""}
        countryName={celebration?.country_name || ""}
        nickname={celebration?.nickname || ""}
        rating={celebration?.rating || 3}
        isNewCountry={isNewCountry}
        onComplete={() => setCelebration(null)}
      />
    </AuthGuard>
  );
}
