"use client";

import { useCallback, useEffect, useState } from "react";
import { authApi } from "@/services/api";
import type { User, LoginData, RegisterData } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginData) => {
    const res = await authApi.login(data);
    localStorage.setItem("token", res.access_token);
    setUser(res.user);
    return res.user;
  };

  const register = async (data: RegisterData) => {
    const res = await authApi.register(data);
    localStorage.setItem("token", res.access_token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, register, logout, checkAuth };
}
