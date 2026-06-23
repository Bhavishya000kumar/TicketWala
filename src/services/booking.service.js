// CineVerse Tickets Booking and Seat Services
// Prepares transaction endpoints for WebSocket coordinates maps and history logs.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';

export const bookingService = {
  /**
   * Fetch current showtime seat bookings map (reserved vs available seats)
   * @param {string} showtimeId 
   * @returns {Promise<string[]>} List of booked seat coordinates
   */
  getBookedSeats: async (showtimeId) => {
    try {
      return await apiClient.get(ENDPOINTS.BOOKINGS.SEAT_STATUS(showtimeId));
    } catch (err) {
      console.warn('[BookingService] Node API seats map unavailable. Simulating clear hall...');
      return []; // Return empty list representing all seats vacant
    }
  },

  createOrder: async (bookingPayload) => {
    // Connects to Node backend which initiates a Razorpay Order
    return await apiClient.post(ENDPOINTS.BOOKINGS.CREATE, bookingPayload);
  },

  verifyPayment: async (paymentDetails) => {
    // Verifies signatures in backend against Razorpay APIs
    return await apiClient.post(ENDPOINTS.BOOKINGS.VERIFY, paymentDetails);
  },

  getUserHistory: async () => {
    try {
      return await apiClient.get(ENDPOINTS.BOOKINGS.HISTORY);
    } catch (err) {
      console.warn('[BookingService] Node API booking history unavailable. Pulling local storage records...');
      const stored = localStorage.getItem('cineverse_booking_history');
      return stored ? JSON.parse(stored) : [];
    }
  }
};

export default bookingService;
