'use client';

import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';
import { AuthContextType, DEMO_USERS, UserProfile, UserRole } from '@/types/auth';

const STORAGE_KEY = 'academia_portal_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Listeners for custom auth events across tabs and components
const listeners = new Set<() => void>();
const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
};

const getSnapshot = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const getServerSnapshot = (): string | null => {
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rawUser = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let user: UserProfile | null = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  const login = useCallback(async (role: UserRole, email?: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const baseProfile = DEMO_USERS[role];
      const loggedUser: UserProfile = email
        ? { ...baseProfile, email }
        : baseProfile;

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        emitChange();
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        emitChange();
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
  }, []);

  const switchRole = useCallback((newRole: UserRole) => {
    if (typeof window !== 'undefined') {
      try {
        const newProfile = DEMO_USERS[newRole];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
        emitChange();
      } catch (err) {
        console.error('Role switch error:', err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: false,
        login,
        logout,
        switchRole,
        demoUsers: DEMO_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
