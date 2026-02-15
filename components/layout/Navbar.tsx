"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { User } from "@/types";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-30 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="text-xl font-bold gradient-text tracking-tight">
            COLONIZE
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-400">
                {user.display_name}
              </span>
              <button
                onClick={onLogout}
                className="text-sm text-gray-400 hover:text-neon-pink transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
