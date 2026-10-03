"use client";

import * as React from "react";
import { apiRequest } from "@/lib/api-client";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMINISTRADOR" | "GESTOR_PROYECTOS" | "CLIENTE";
  company?: string;
  phone?: string;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const savedToken = localStorage.getItem("codeah_token");
    const savedUser = localStorage.getItem("codeah_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("codeah_token");
        localStorage.removeItem("codeah_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiRequest<{ accessToken: string; user: User }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    setToken(data.accessToken);
    setUser(data.user);
    localStorage.setItem("codeah_token", data.accessToken);
    localStorage.setItem("codeah_user", JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("codeah_token");
    localStorage.removeItem("codeah_user");
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
