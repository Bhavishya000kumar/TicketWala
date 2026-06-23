// CineVerse Booking Store Placeholder
// Manages global transaction flows, tickets selections, active seat selections, and coupon validations.

const createBookingStore = () => {
  let state = {
    selectedMovie: null,
    selectedDate: null,
    selectedCinema: null,
    selectedShowtime: null,
    selectedSeats: [],
    couponCode: null,
    discountAmount: 0,
    baseTicketPrice: 250,
    taxPercentage: 18,
    bookingHistory: []
  };

  const listeners = new Set();
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setState = (nextState) => {
    state = { ...state, ...nextState };
    listeners.forEach(listener => listener(state));
  };

  const selectMovie = (movie) => setState({ selectedMovie: movie });
  const selectDate = (date) => setState({ selectedDate: date });
  const selectCinema = (cinema) => setState({ selectedCinema: cinema });
  const selectShowtime = (showtime) => setState({ selectedShowtime: showtime });
  
  const toggleSeat = (seatId) => {
    const seats = [...state.selectedSeats];
    const idx = seats.indexOf(seatId);
    if (idx > -1) {
      seats.splice(idx, 1);
    } else {
      seats.push(seatId);
    }
    setState({ selectedSeats: seats });
  };

  const applyCoupon = (code, discount) => {
    setState({ couponCode: code, discountAmount: discount });
  };

  const clearBooking = () => {
    setState({
      selectedMovie: null,
      selectedDate: null,
      selectedCinema: null,
      selectedShowtime: null,
      selectedSeats: [],
      couponCode: null,
      discountAmount: 0
    });
  };

  return {
    getState,
    subscribe,
    selectMovie,
    selectDate,
    selectCinema,
    selectShowtime,
    toggleSeat,
    applyCoupon,
    clearBooking
  };
};

export const bookingStore = createBookingStore();
export default bookingStore;
