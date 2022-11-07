import { ReactNode, useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

import type { Credentials, User } from "./types";

type AuthContextType = {
  checkLogin: () => void;
  isChecked: boolean;
  login: (credentials: Credentials) => void,
  logout: () => void,
  user: User | null;
};

const initialContextValue = {
  checkLogin: () => { /* noop */ },
  isChecked: false,
  login: (credentials: Credentials) => { /* noop */ },
  logout: () => { /* noop */ },
  user: null,
};

const AuthContext = createContext<AuthContextType>(initialContextValue);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [isChecked, setIsChecked] = useState<AuthContextType['isChecked']>(initialContextValue.isChecked);
  const [user, setUser] = useState<AuthContextType['user']>(initialContextValue.user);
  const location = useLocation();
  const navigate = useNavigate();

  const checkLogin = () => axios.get("api/auth/me")
    .then((res) => {
        const { id, email } = res.data;
        const redirectionPath = location.pathname !== '/login' ? location.pathname : '/';
        
        setUser({ id, email });
        localStorage.setItem("user", JSON.stringify({ id, email }));

        navigate(redirectionPath);
    })
    .catch((err) => {
        setUser(initialContextValue.user);
        localStorage.clear();
    })
    .finally(() => setIsChecked(true));

  const login = (credentials: Credentials) => axios.post("/api/auth/login", credentials)
    .then((res) => {
      const { id, email } = res.data;
      setUser({ id, email })
      navigate('/');
    })
    .catch((err) => {
      setUser(initialContextValue.user);
      localStorage.clear();
    })
    .finally(() => setIsChecked(true));

  const logout = () => axios.delete("/api/auth/logout")
    .then((res) => {
      setUser(initialContextValue.user);
      localStorage.clear();
      navigate('/');
    });

  return {
    checkLogin,
    isChecked,
    login,
    logout,
    user,
  };
}