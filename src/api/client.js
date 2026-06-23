// CineVerse Custom HTTP client wrapper around native fetch
// Replicates Axios design patterns without requiring additional packages.

import { ENV } from '../config/env';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = localStorage.getItem('cineverse_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    // Check if token expired / unauthorized
    if (response.status === 401) {
      console.warn('[HTTP Client] Unauthorized request. Clearing local session...');
      localStorage.removeItem('cineverse_token');
      localStorage.removeItem('cineverse_user');
      // Optionally trigger page redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/login?expired=true';
      }
    }

    let errorMessage = 'HTTP Request error occurred';
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch (e) {
      // Body not JSON
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    return null; // Empty body (e.g. 204 No Content)
  }
};

export const apiClient = {
  get: async (endpoint, options = {}) => {
    const url = `${ENV.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { ...getHeaders(), ...options.headers },
      ...options
    });
    return handleResponse(response);
  },

  post: async (endpoint, body = {}, options = {}) => {
    const url = `${ENV.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...getHeaders(), ...options.headers },
      body: JSON.stringify(body),
      ...options
    });
    return handleResponse(response);
  },

  put: async (endpoint, body = {}, options = {}) => {
    const url = `${ENV.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { ...getHeaders(), ...options.headers },
      body: JSON.stringify(body),
      ...options
    });
    return handleResponse(response);
  },

  delete: async (endpoint, options = {}) => {
    const url = `${ENV.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...getHeaders(), ...options.headers },
      ...options
    });
    return handleResponse(response);
  }
};

export default apiClient;
