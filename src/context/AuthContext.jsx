import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = localStorage.getItem("cp_user");
    const token = localStorage.getItem("cp_token");
    if (token && cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        /* ignore corrupt cache */
      }
    }
    setLoading(false);
  }, []);

  const persist = (nextUser, token) => {
    localStorage.setItem("cp_user", JSON.stringify(nextUser));
    if (token) localStorage.setItem("cp_token", token);
    setUser(nextUser);
  };

  const signup = useCallback(async ({ name, email, password }) => {
    const data = await api.post("/auth/signup", { name, email, password });
    persist(data.user, data.token);
    return data.user;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const data = await api.post("/auth/login", { email, password });
    persist(data.user, data.token);
    return data.user;
  }, []);

  const updateMe = useCallback(async (updates) => {
    const data = await api.put("/auth/me", updates);
    persist(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cp_token");
    localStorage.removeItem("cp_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, updateMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
