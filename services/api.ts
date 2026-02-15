import type {
  TokenResponse,
  RegisterData,
  LoginData,
  Encounter,
  EncounterCreate,
  EncounterUpdate,
  Stats,
  User,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ──
export const authApi = {
  register: (data: RegisterData) =>
    request<TokenResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginData) =>
    request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => request<User>("/auth/me"),
};

// ── Encounters ──
export const encountersApi = {
  list: () => request<Encounter[]>("/encounters/"),

  create: (data: EncounterCreate) =>
    request<Encounter>("/encounters/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  stats: () => request<Stats>("/encounters/stats"),

  update: (id: string, data: EncounterUpdate) =>
    request<Encounter>(`/encounters/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`/encounters/${id}`, { method: "DELETE" }),
};

// ── Uploads ──
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000";

export const uploadsApi = {
  uploadPhoto: async (file: File): Promise<string> => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/uploads/photo`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.detail || "Error subiendo foto");
    }

    const data = await res.json();
    return data.url; // e.g. "/uploads/filename.jpg"
  },

  /** Convert relative upload path to full URL */
  getPhotoUrl: (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL}${path}`;
  },
};
