"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PhotoUpload from "@/components/ui/PhotoUpload";
import type { Encounter, EncounterUpdate } from "@/types";

interface EditEncounterModalProps {
  encounter: Encounter | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: EncounterUpdate) => Promise<void>;
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

export default function EditEncounterModal({
  encounter,
  isOpen,
  onClose,
  onSave,
}: EditEncounterModalProps) {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    nickname: "",
    gender: "female",
    city: "",
    notes: "",
    rating: "3",
  });

  useEffect(() => {
    if (encounter) {
      setForm({
        nickname: encounter.nickname,
        gender: encounter.gender,
        city: encounter.city || "",
        notes: encounter.notes || "",
        rating: String(encounter.rating || 3),
      });
      setPhotoUrl(encounter.photo_url || null);
    }
  }, [encounter]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!encounter) return;
    setLoading(true);
    try {
      await onSave(encounter.id, {
        nickname: form.nickname,
        gender: form.gender as "male" | "female" | "other",
        city: form.city || undefined,
        notes: form.notes || undefined,
        photo_url: photoUrl || undefined,
        rating: parseInt(form.rating),
      });
      toast.success("¡Conquista actualizada! ✏️");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  if (!encounter) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Conquista ✏️">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />
        <Input
          label="Nombre / Apodo"
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
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-sm text-white font-medium">
              {encounter.country_name}
            </p>
            <p className="text-xs text-gray-500">
              País no editable
            </p>
          </div>
        </div>
        <Input
          label="Ciudad"
          placeholder="¿Dónde fue?"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <Select
          label="Rating"
          options={ratingOptions}
          value={form.rating}
          onChange={(e) => update("rating", e.target.value)}
        />
        <Input
          label="Notas"
          placeholder="Algo que recordar..."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Guardar Cambios 💾
        </Button>
      </form>
    </Modal>
  );
}
