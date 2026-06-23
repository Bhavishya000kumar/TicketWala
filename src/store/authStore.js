// CineVerse Auth Global Store Placeholder
// Preconfigured to resemble standard Zustand / Redux state dispatch layouts.

import { authService } from '../services/auth.service';

const createAuthStore = () => {
  let state = {
    user: null,
    token: localStorage.getItem('cineverse_token') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  const listeners = new Set();

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getState = () => state;

  const setState = (nextState) => {
    state = { ...state, ...nextState };
    listeners.forEach(listener => listener(state));
  };

  const login = async (email, password) => {
    setState({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('cineverse_token', data.token);
      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false
      });
      return data;
    } catch (err) {
      setState({ error: err.message, loading: false });
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('cineverse_token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false
    });
  };

  return { getState, subscribe, login, logout };
};

export const authStore = createAuthStore();
export default authStore;
