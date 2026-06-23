// CineVerse User & JWT Authentication Services
// Bridges backend JWT endpoints and holds mock session fallbacks.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';

export const authService = {
  login: async (email, password) => {
    try {
      // Connect to Node.js backend
      return await apiClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
    } catch (err) {
      console.warn('[AuthService] Node API login unavailable. Falling back to mock session...');
      // Simulated response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-header.payload-signature',
            user: {
              id: 'usr_mock_1',
              name: email.split('@')[0],
              email: email,
              role: email.includes('admin') ? 'admin' : 'user'
            }
          });
        }, 500);
      });
    }
  },

  register: async (name, email, password) => {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.REGISTER, { name, email, password });
    } catch (err) {
      console.warn('[AuthService] Node API registration unavailable. Simulating session...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-header.payload-signature',
            user: {
              id: 'usr_mock_2',
              name,
              email,
              role: 'user'
            }
          });
        }, 500);
      });
    }
  },

  logout: async () => {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.warn('[AuthService] Node API logout connection bypass.');
    }
    localStorage.removeItem('cineverse_token');
    localStorage.removeItem('cineverse_user');
  },

  getMe: async () => {
    try {
      return await apiClient.get(ENDPOINTS.AUTH.ME);
    } catch (err) {
      const stored = localStorage.getItem('cineverse_user');
      return stored ? JSON.parse(stored) : null;
    }
  }
};

export default authService;
