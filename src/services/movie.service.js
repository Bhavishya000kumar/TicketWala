// CineVerse Movies Query and Management Services
// Supports Cloudinary image uploads triggers and handles mock fallback datasets.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';
import { NOW_SHOWING_MOVIES, COMING_SOON_MOVIES } from '../data/movies';

export const movieService = {
  getAllNowShowing: async () => {
    try {
      return await apiClient.get(ENDPOINTS.MOVIES.LIST + '?status=now-showing');
    } catch (err) {
      console.warn('[MovieService] Node API now-showing list unavailable. Loading local dataset...');
      return NOW_SHOWING_MOVIES;
    }
  },

  getAllComingSoon: async () => {
    try {
      return await apiClient.get(ENDPOINTS.MOVIES.LIST + '?status=coming-soon');
    } catch (err) {
      console.warn('[MovieService] Node API coming-soon list unavailable. Loading local dataset...');
      return COMING_SOON_MOVIES;
    }
  },

  getMovieById: async (id) => {
    try {
      return await apiClient.get(ENDPOINTS.MOVIES.DETAIL(id));
    } catch (err) {
      console.warn(`[MovieService] Node API movie detail for "${id}" unavailable. Searching local collections...`);
      const all = [...NOW_SHOWING_MOVIES, ...COMING_SOON_MOVIES];
      const found = all.find(m => m.id === id);
      if (!found) throw new Error('Movie not found');
      return found;
    }
  },

  // Admin Methods (MongoDB insertions & Cloudinary hooks)
  createMovie: async (moviePayload) => {
    return await apiClient.post(ENDPOINTS.MOVIES.CREATE, moviePayload);
  },

  updateMovie: async (id, moviePayload) => {
    return await apiClient.put(ENDPOINTS.MOVIES.UPDATE(id), moviePayload);
  },

  deleteMovie: async (id) => {
    return await apiClient.delete(ENDPOINTS.MOVIES.DELETE(id));
  },

  /**
   * Upload image files directly to Cloudinary via backend signature
   * @param {File} fileObject 
   * @returns {Promise<{url: string}>}
   */
  uploadToCloudinary: async (fileObject) => {
    const formData = new FormData();
    formData.append('file', fileObject);
    
    // Custom header override for file uploads
    return await apiClient.post(ENDPOINTS.MOVIES.UPLOADS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default movieService;
