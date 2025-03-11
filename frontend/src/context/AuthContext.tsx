import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userApi } from "../api/api";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUserProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await userApi.login(email, password);
      setUser(data);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("userToken", data.token);
    } catch (e: any) {
      setError(e.response?.data?.message || "An error occurred during login");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await userApi.register(name, email, password);
      setUser(data);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("userToken", data.token);
    } catch (e: any) {
      setError(
        e.response?.data?.message || "An error occurred during registration",
      );
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userToken");
  };

  // Update user profile
  const updateUserProfile = async (userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await userApi.updateUserProfile(userData);
      setUser(data);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("userToken", data.token);
    } catch (e: any) {
      setError(
        e.response?.data?.message || "An error occurred while updating profile",
      );
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
