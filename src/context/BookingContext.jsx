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

  useEffect(() => {
    // Load historical bookings
    const storedHistory = localStorage.getItem('cineverse_booking_history');
    if (storedHistory) {
      setBookingHistory(JSON.parse(storedHistory));
    }
  }, []);

  const selectMovie = (movie) => {
    setBooking(prev => ({ ...prev, movie }));
  };

  const selectDate = (date) => {
    setBooking(prev => ({ ...prev, date }));
  };

  const selectCinema = (cinema) => {
    setBooking(prev => ({ ...prev, cinema }));
  };

  const selectShowtime = (showtime) => {
    setBooking(prev => ({ ...prev, showtime }));
  };

  const toggleSeat = (seatId, price = 250) => {
    setBooking(prev => {
      const seats = [...prev.selectedSeats];
      const index = seats.indexOf(seatId);
      if (index > -1) {
        seats.splice(index, 1);
      } else {
        seats.push(seatId);
      }
      return {
        ...prev,
        selectedSeats: seats,
        totalAmount: seats.length * price
      };
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
        confirmBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
