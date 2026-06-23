// CineVerse Session Token Manager
// Manages local storage caching of user JWT auth headers.

export const tokenManager = {
  getToken: () => {
    return localStorage.getItem('cineverse_token');
  },

  setToken: (token) => {
    localStorage.setItem('cineverse_token', token);
  },

  clearToken: () => {
    localStorage.removeItem('cineverse_token');
  },

  getUser: () => {
    const user = localStorage.getItem('cineverse_user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => {
    localStorage.setItem('cineverse_user', JSON.stringify(user));
  },

  clearUser: () => {
    localStorage.removeItem('cineverse_user');
  }
};

export default tokenManager;
