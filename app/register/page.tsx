"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";

const genderOptions = [
  { value: "male", label: "Hombre" },
  { value: "female", label: "Mujer" },
  { value: "other", label: "Otro" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    display_name: "",
    gender: "male" as const,
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("¡Cuenta creada! A conquistar 🌍");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <Toaster position="top-center" />

      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-neon-pink/15 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            Únete
          </h1>
          <p className="text-gray-500">Crea tu mapa de conquistas personal</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
          <Input
            label="Nombre visible"
            placeholder="Tu nombre o apodo"
            value={form.display_name}
            onChange={(e) => update("display_name", e.target.value)}
            required
          />
          <Input
            label="Username"
            placeholder="usuario123"
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
            minLength={6}
          />
          <Select
            label="Género"
            options={genderOptions}
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
          />
          <Button type="submit" loading={loading} className="w-full">
            Crear Cuenta 🚀
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-neon-purple hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
