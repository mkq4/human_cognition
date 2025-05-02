"use client";

// Создаётся контекст и провайдер

import { IUser } from "@/types/user";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

interface IAuthContext {
  user: IUser | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  updateProfile: () => Promise<IUser | null>;
}

export const AuthContext = createContext<IAuthContext>({
  // based values
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  updateProfile: async () => null,
});

export const AuthProvider = ({ className, children }: Props) => {
  //стеты для хранения данных
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
		const initAuth = async () => {
			await updateProfile();
		}
		initAuth()
	}, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    updateProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async () => {
    setIsLoading(true);
		localStorage.setItem("token", "niggaToken")
    const token = localStorage.getItem("token");
		console.log("token", token)
    if (!token) {
      setUser(null);
      return null;
    }

    try {
      if (token) {
        // mok user
        const user = {
          id: 1,
          name: "Makaquich",
          email: "test@test.ru",
        };
				console.log(user)
        setUser(user);
        return user;
      }
      return null;
    } catch (e) {
      console.log("error user auth", e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{ user, login, logout, isLoading, updateProfile }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};