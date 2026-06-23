import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('cineverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate JWT/backend authenticating API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: 'user_123',
            name: email.split('@')[0],
            email: email,
            role: 'user', // 'user' or 'admin' (prepares for admin dashboard)
            token: 'mock-jwt-token-xyz'
          };
          setUser(mockUser);
          localStorage.setItem('cineverse_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
        setLoading(false);
      }, 800);
    });
  };

  const loginWithFirebase = async () => {
    setLoading(true);
    // Simulate Firebase Authentication provider login
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'firebase_999',
          name: 'Premium Cinephile',
          email: 'cinephile@cineverse.com',
          role: 'user',
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
          token: 'mock-firebase-id-token'
        };
        setUser(mockUser);
        localStorage.setItem('cineverse_user', JSON.stringify(mockUser));
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cineverse_user');
  };

  const register = async (name, email, password) => {
    setLoading(true);
    // Simulate register
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'user_' + Math.random().toString(36).substring(2, 9),
          name,
          email,
          role: 'user',
          token: 'mock-jwt-token-xyz'
        };
        setUser(mockUser);
        localStorage.setItem('cineverse_user', JSON.stringify(mockUser));
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithFirebase, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
