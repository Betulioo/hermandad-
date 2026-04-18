'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { saveToken, removeToken, getToken, saveRole, removeRole } from '@/lib/auth';

export type UserRole = 'USER' | 'ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get<AuthUser>('/auth/me')
      .then(({ data }) => {
        setUser(data);
        saveRole(data.role);
      })
      .catch(() => {
        removeToken();
        removeRole();
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(token: string): Promise<void> {
    saveToken(token);
    const { data } = await api.get<AuthUser>('/auth/me');
    saveRole(data.role);
    setUser(data);
  }

  function logout(): void {
    removeToken();
    removeRole();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
