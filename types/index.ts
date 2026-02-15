export interface User {
  id: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  display_name: string;
  avatar_url: string | null;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Encounter {
  id: string;
  nickname: string;
  gender: "male" | "female" | "other";
  country_code: string;
  country_name: string;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  date: string;
  notes: string | null;
  photo_url: string | null;
  rating: number | null;
  created_at: string;
}

export interface EncounterCreate {
  nickname: string;
  gender: "male" | "female" | "other";
  country_code: string;
  country_name: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  date: string;
  notes?: string;
  photo_url?: string;
  rating?: number;
}

export interface EncounterUpdate {
  nickname?: string;
  gender?: "male" | "female" | "other";
  city?: string;
  notes?: string;
  photo_url?: string;
  rating?: number;
}

export interface CountryStats {
  country_code: string;
  country_name: string;
  count: number;
}

export interface Stats {
  total_encounters: number;
  total_countries: number;
  countries_detail: CountryStats[];
  by_gender: Record<string, number>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  display_name: string;
}

export interface LoginData {
  email: string;
  password: string;
}
