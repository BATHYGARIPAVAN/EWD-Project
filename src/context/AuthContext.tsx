import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string; role?: UserRole }) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ewd_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ewd_auth_token');
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('ewd_auth_user', JSON.stringify(user));
      localStorage.setItem('ewd_auth_token', token);
    } else {
      localStorage.removeItem('ewd_auth_user');
      localStorage.removeItem('ewd_auth_token');
    }
  }, [user, token]);

  const login = async (credentials: { email: string; password: string; role?: UserRole }) => {
    setLoading(true);
    try {
      const response = await api.login(credentials);
      setUser(response.user);
      setToken(response.token);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      const response = await api.register(userData);
      setUser(response.user);
      setToken(response.token);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.updateProfile({ id: user.id, ...profileData });
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ewd_auth_user');
    localStorage.removeItem('ewd_auth_token');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated,
        isAdmin,
        login,
        register,
        updateProfile,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
