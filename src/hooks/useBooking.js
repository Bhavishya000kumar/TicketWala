import { useBooking as useBookingContext } from '../context/BookingContext';

/**
 * Custom hook to access CineVerse booking actions & state
 * @returns {{ booking: Object, bookingHistory: Array, selectMovie: Function, selectDate: Function, selectCinema: Function, selectShowtime: Function, toggleSeat: Function, clearBooking: Function, confirmBooking: Function }}
 */
export const useBooking = () => {
  return useBookingContext();
};

export default useBooking;
