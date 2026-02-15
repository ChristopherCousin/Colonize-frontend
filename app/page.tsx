"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CallToAction from "@/components/landing/CallToAction";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <Hero />
      <Features />
      <CallToAction />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-sm text-gray-600">
          COLONIZE © {new Date().getFullYear()} — Tu mapa, tus reglas
        </p>
      </footer>
    </>
  );
}
