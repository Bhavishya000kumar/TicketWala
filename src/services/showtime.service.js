// CineVerse Showtimes Allocation Services
// Handles theater slot allocations and provides mock timing catalogs.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';
import { SHOWTIMES_DATA } from './api';

export const showtimeService = {
  getShowtimesByMovie: async (movieId) => {
    try {
      return await apiClient.get(ENDPOINTS.SHOWTIMES.BY_MOVIE(movieId));
    } catch (err) {
      console.warn(`[ShowtimeService] Node API showtimes for movie "${movieId}" unavailable. Using default slots...`);
      return SHOWTIMES_DATA;
    }
  },

  getShowtimesByCinema: async (cinemaId) => {
    try {
      return await apiClient.get(ENDPOINTS.SHOWTIMES.BY_CINEMA(cinemaId));
    } catch (err) {
      console.warn(`[ShowtimeService] Node API showtimes for cinema "${cinemaId}" unavailable. Using defaults...`);
      return SHOWTIMES_DATA;
    }
  },

  createShowtime: async (showtimePayload) => {
    return await apiClient.post(ENDPOINTS.SHOWTIMES.CREATE, showtimePayload);
  }
};

export default showtimeService;
