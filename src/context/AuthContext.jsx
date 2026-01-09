import React, { createContext, useEffect, useState, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("av_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("av_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("av_user");
    }
  }, [user]);

  const setToken = (token) => {
    if (token) localStorage.setItem("av_token", token);
    else localStorage.removeItem("av_token");
  };

  const register = async (payload) => {
    const res = await api.post("/register", payload);
    const { token, user: u } = res.data;
    setToken(token);
    setUser(u);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    const { token, user: u } = res.data;
    setToken(token);
    setUser(u);
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= IMPORTANT PART ================= */
export const useAuth = () => {
  return useContext(AuthContext);
};
/* ================================================== */

export default AuthContext;
