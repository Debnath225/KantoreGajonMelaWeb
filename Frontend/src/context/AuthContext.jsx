import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/authContextInstance";
import { api } from "@/lib/api";

const TOKEN_KEY = "kantore_auth_token";


export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    let mounted = true;
    api
      .authMe(token)
      .then((response) => {
        if (!mounted) return;
        setUser(response.user || null);
      })
      .catch(() => {
        if (!mounted) return;
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setUser(null);
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  const login = async ({ email, password }) => {
    const response = await api.authLogin({ email, password });
    const nextToken = response.token;
    if (!nextToken) throw new Error("Login failed");
    sessionStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(response.user || null);
    return response.user;
  };

  const signup = async ({ fullName, email, password }) => {
    const response = await api.authSignup({ fullName, email, password });
    const nextToken = response.token;
    if (!nextToken) throw new Error("Signup failed");
    sessionStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(response.user || null);
    return response.user;
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      authLoading: Boolean(token) && !user,
      login,
      signup,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
