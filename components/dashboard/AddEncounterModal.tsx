"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import CountrySearchSelect from "@/components/ui/CountrySearchSelect";
import Button from "@/components/ui/Button";
import PhotoUpload from "@/components/ui/PhotoUpload";
import { COUNTRIES } from "@/lib/countries";
import type { EncounterCreate } from "@/types";

export interface ConquestResult {
  country_code: string;
  country_name: string;
  nickname: string;
  rating: number;
}

interface AddEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: EncounterCreate) => Promise<void>;
  onConquestComplete?: (result: ConquestResult) => void;
}

const genderOptions = [
  { value: "male", label: "Chico ♂️" },
  { value: "female", label: "Chica ♀️" },
  { value: "other", label: "Otro ✨" },
];

const ratingOptions = [
  { value: "1", label: "🔥" },
  { value: "2", label: "🔥🔥" },
  { value: "3", label: "🔥🔥🔥" },
  { value: "4", label: "🔥🔥🔥🔥" },
  { value: "5", label: "🔥🔥🔥🔥🔥" },
];

export default function AddEncounterModal({
  isOpen,
  onClose,
  onAdd,
  onConquestComplete,
}: AddEncounterModalProps) {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    nickname: "",
    gender: "female",
    country_code: "ES",
    city: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    rating: "3",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setForm({
      nickname: "", gender: "female", country_code: "ES",
      city: "", date: new Date().toISOString().split("T")[0],
      notes: "", rating: "3",
    });
    setPhotoUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const country = COUNTRIES.find((c) => c.code === form.country_code);
      const countryName = country?.name || form.country_code;

      await onAdd({
        nickname: form.nickname,
        gender: form.gender as "male" | "female" | "other",
        country_code: form.country_code,
        country_name: countryName,
        city: form.city || undefined,
        date: new Date(form.date).toISOString(),
        notes: form.notes || undefined,
        photo_url: photoUrl || undefined,
        rating: parseInt(form.rating),
      });

      onClose();
      onConquestComplete?.({
        country_code: form.country_code,
        country_name: countryName,
        nickname: form.nickname,
        rating: parseInt(form.rating),
      });
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Conquista 🏴‍☠️">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />
        <Input
          label="Nombre / Apodo"
          placeholder="¿Cómo se llama?"
          value={form.nickname}
          onChange={(e) => update("nickname", e.target.value)}
          required
        />
        <Select
          label="Género"
          options={genderOptions}
          value={form.gender}
          onChange={(e) => update("gender", e.target.value)}
        />
        <CountrySearchSelect
          label="País de origen"
          value={form.country_code}
          onChange={(code) => update("country_code", code)}
        />
        <Input
          label="Ciudad (opcional)"
          placeholder="¿Dónde fue?"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <Input
          label="Fecha"
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          required
        />
        <Select
          label="Rating"
          options={ratingOptions}
          value={form.rating}
          onChange={(e) => update("rating", e.target.value)}
        />
        <Input
          label="Notas (opcional)"
          placeholder="Algo que recordar..."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Conquistar 🌍
        </Button>
      </form>
    </Modal>
  );
}
