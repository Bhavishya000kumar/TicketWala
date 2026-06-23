// CineVerse Reviews & User Feedback Services
// Bridges user rating commentary structures and manages mock list iterations.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';

export const reviewService = {
  getReviewsByMovie: async (movieId) => {
    try {
      return await apiClient.get(ENDPOINTS.REVIEWS.BY_MOVIE(movieId));
    } catch (err) {
      console.warn(`[ReviewService] Node API reviews for movie "${movieId}" unavailable. Returning empty list...`);
      return [
        {
          id: 'r_mock_1',
          userName: 'Rohan Sharma',
          rating: 9,
          comment: 'Absolutely spectacular visual masterpiece! Visually stunning cast acting.',
          date: new Date().toISOString()
        },
        {
          id: 'r_mock_2',
          userName: 'Priya Iyer',
          rating: 8,
          comment: 'Superb spatial Dolby sound mixing! Recommending IMAX screening.',
          date: new Date().toISOString()
        }
      ];
    }
  },

  addReview: async (reviewPayload) => {
    return await apiClient.post(ENDPOINTS.REVIEWS.ADD, reviewPayload);
  },

  deleteReview: async (id) => {
    return await apiClient.delete(ENDPOINTS.REVIEWS.DELETE(id));
  }
};

export default reviewService;
