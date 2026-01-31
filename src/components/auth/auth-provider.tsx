"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  xp: number;
  rank: string;
  crackedPasswords: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mock session check
    const storedUser = sessionStorage.getItem('cybercrack-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (email: string) => {
    const mockUser: User = {
      email,
      xp: 1337,
      rank: "Maître Cracker",
      crackedPasswords: 42,
    };
    sessionStorage.setItem('cybercrack-user', JSON.stringify(mockUser));
    setUser(mockUser);
    router.push('/hub');
  };

  const signOut = () => {
    sessionStorage.removeItem('cybercrack-user');
    setUser(null);
    router.push('/');
  };

  const value = { user, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
