import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const initialBookingState = {
  movie: null,
  date: null,
  cinema: null,
  showtime: null,
  selectedSeats: [],
  totalAmount: 0
};

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(initialBookingState);
  const [bookingHistory, setBookingHistory] = useState([]);
  
  // Day 4B: Store selected theatre and persist in localStorage
  const [selectedTheatre, setSelectedTheatre] = useState(() => {
    try {
      const stored = localStorage.getItem('cineverse_selected_theatre');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('[BookingContext] Error reading selected theatre from localStorage:', e);
      return null;
    }
  });

  const selectTheatre = (theatre) => {
    setSelectedTheatre(theatre);
    try {
      if (theatre) {
        localStorage.setItem('cineverse_selected_theatre', JSON.stringify(theatre));
      } else {
        localStorage.removeItem('cineverse_selected_theatre');
      }
    } catch (e) {
      console.error('[BookingContext] Error writing selected theatre to localStorage:', e);
    }
  };

  const selectedTheatreId = selectedTheatre ? selectedTheatre.id : null;

  // Day 4C: Store selected date and persist in localStorage
  const [selectedDate, setSelectedDate] = useState(() => {
    try {
      const stored = localStorage.getItem('cineverse_selected_date');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('[BookingContext] Error reading selected date from localStorage:', e);
      return null;
    }
  });

  // Day 4C: Store selected showtime and persist in localStorage
  const [selectedShowtime, setSelectedShowtime] = useState(() => {
    try {
      const stored = localStorage.getItem('cineverse_selected_showtime');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('[BookingContext] Error reading selected showtime from localStorage:', e);
      return null;
    }
  });

  // Day 4D: Store selected seats (as array of objects) and persist in localStorage
  const [selectedSeats, setSelectedSeats] = useState(() => {
    try {
      const stored = localStorage.getItem('cineverse_selected_seats');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('[BookingContext] Error reading selected seats from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    // Load historical bookings
    const storedHistory = localStorage.getItem('cineverse_booking_history');
    if (storedHistory) {
      setBookingHistory(JSON.parse(storedHistory));
    }
    
    // Load movie from localStorage if present
    try {
      const storedMovie = localStorage.getItem('cineverse_selected_movie');
      if (storedMovie) {
        setBooking(prev => ({ ...prev, movie: JSON.parse(storedMovie) }));
      }
    } catch (e) {
      console.error('[BookingContext] Error reading selected movie from localStorage:', e);
    }

    // Load cinema from localStorage if present
    try {
      const storedCinema = localStorage.getItem('cineverse_selected_cinema') || localStorage.getItem('cineverse_selected_theatre');
      if (storedCinema) {
        setBooking(prev => ({ ...prev, cinema: JSON.parse(storedCinema) }));
      }
    } catch (e) {
      console.error('[BookingContext] Error reading selected cinema from localStorage:', e);
    }
  }, []);

  const selectMovie = (movie) => {
    setBooking(prev => ({ ...prev, movie }));
    try {
      if (movie) {
        localStorage.setItem('cineverse_selected_movie', JSON.stringify(movie));
      } else {
        localStorage.removeItem('cineverse_selected_movie');
      }
    } catch (e) {
      console.error('[BookingContext] Error writing selected movie to localStorage:', e);
    }
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    setBooking(prev => ({ ...prev, date: date?.value || date }));
    try {
      if (date) {
        localStorage.setItem('cineverse_selected_date', JSON.stringify(date));
      } else {
        localStorage.removeItem('cineverse_selected_date');
      }
    } catch (e) {
      console.error('[BookingContext] Error writing selected date to localStorage:', e);
    }
  };

  const selectCinema = (cinema) => {
    setBooking(prev => ({ ...prev, cinema }));
    try {
      if (cinema) {
        localStorage.setItem('cineverse_selected_cinema', JSON.stringify(cinema));
      } else {
        localStorage.removeItem('cineverse_selected_cinema');
      }
    } catch (e) {
      console.error('[BookingContext] Error writing selected cinema to localStorage:', e);
    }
  };

  const selectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
    setBooking(prev => ({ ...prev, showtime: showtime?.time || showtime }));
    try {
      if (showtime) {
        localStorage.setItem('cineverse_selected_showtime', JSON.stringify(showtime));
      } else {
        localStorage.removeItem('cineverse_selected_showtime');
      }
    } catch (e) {
      console.error('[BookingContext] Error writing selected showtime to localStorage:', e);
    }
  };

  const toggleSeat = (seatObj) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seatObj.id);
      let updated;
      if (exists) {
        updated = prev.filter(s => s.id !== seatObj.id);
      } else {
        // Enforce maximum 10 seats limit
        if (prev.length >= 10) {
          return prev;
        }
        updated = [...prev, seatObj];
      }
      
      try {
        localStorage.setItem('cineverse_selected_seats', JSON.stringify(updated));
      } catch (e) {
        console.error('[BookingContext] Error writing selected seats to localStorage:', e);
      }
      
      // Update original booking state for compatibility (as array of IDs)
      setBooking(prevBooking => ({
        ...prevBooking,
        selectedSeats: updated.map(s => s.id)
      }));
      
      return updated;
    });
  };

  const clearBooking = () => {
    setBooking(initialBookingState);
  };

  // Simulate Razorpay and MongoDB integration for payment and booking capture
  const confirmBooking = async (paymentMethod = 'Razorpay') => {
    return new Promise((resolve, reject) => {
      if (!booking.movie || !booking.date || !booking.cinema || !booking.showtime) {
        reject(new Error('Incomplete booking information'));
        return;
      }

      setTimeout(() => {
        const transactionId = 'pay_' + Math.random().toString(36).substring(2, 12);
        const ticketId = 'CV_' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const newBooking = {
          id: ticketId,
          movie: booking.movie,
          date: booking.date,
          cinema: booking.cinema,
          showtime: booking.showtime,
          seats: booking.selectedSeats.length > 0 ? booking.selectedSeats : ['A1', 'A2'], // fallback default seats
          amount: booking.totalAmount > 0 ? booking.totalAmount : 500, // fallback amount
          paymentId: transactionId,
          paymentMethod,
          bookingTime: new Date().toISOString(),
          status: 'Confirmed'
        };

        const updatedHistory = [newBooking, ...bookingHistory];
        setBookingHistory(updatedHistory);
        localStorage.setItem('cineverse_booking_history', JSON.stringify(updatedHistory));
        clearBooking();
        resolve(newBooking);
      }, 1500);
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        bookingHistory,
        selectMovie,
        selectDate,
        selectCinema,
        selectShowtime,
        toggleSeat,
        clearBooking,
        confirmBooking,
        selectedTheatre,
        selectedTheatreId,
        selectTheatre,
        selectedDate,
        selectedShowtime,
        selectDate,
        selectShowtime,
        selectedSeats
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
