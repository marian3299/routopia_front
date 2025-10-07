import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Revisar si hay token guardado
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    const { token, username: name, email, role } = res.data;
    Cookies.set("token", token, { expires: 7 });
    const userData = { username: name, email, role };
    setUser(userData);
    return userData;
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    const { token, username: name, role } = res.data;
    Cookies.set("token", token, { expires: 7 });
    const userData = { username: name, email, role };
    setUser(userData);
    return userData;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
