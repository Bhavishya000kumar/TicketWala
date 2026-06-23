import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { MOVIES_DATA, CINEMAS_DATA, SHOWTIMES_DATA, getBookingDates } from '../services/api';
import Dropdown from './ui/Dropdown';
import Button from './ui/Button';
import { Film, Calendar, MapPin, Clock, CheckCircle2, Ticket, CreditCard, ChevronRight } from 'lucide-react';

const QuickBooking = () => {
  const { booking, selectMovie, selectDate, selectCinema, selectShowtime, confirmBooking, clearBooking } = useBooking();
  const [dates, setDates] = useState([]);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  // Initialize dynamic dates
  useEffect(() => {
    const generatedDates = getBookingDates();
    setDates(generatedDates);
    // Set default date if none is selected
    if (generatedDates.length > 0 && !booking.date) {
      selectDate(generatedDates[0]);
    }
  }, []);

  const handleMovieChange = (movie) => {
    selectMovie(movie);
  };

  const handleDateChange = (dateOption) => {
    selectDate(dateOption);
  };

  const handleCinemaChange = (cinema) => {
    selectCinema(cinema);
  };

  const handleShowtimeChange = (showtime) => {
    selectShowtime(showtime);
  };

  const handleBookNowSubmit = async (e) => {
    e.preventDefault();
    if (!booking.movie) {
      alert('Please select a movie');
      return;
    }
    if (!booking.date) {
      alert('Please select a date');
      return;
    }
    if (!booking.cinema) {
      alert('Please select a cinema');
      return;
    }
    if (!booking.showtime) {
      alert('Please select a showtime');
      return;
    }

    setIsBookingInProgress(true);
    try {
      const confirmedData = await confirmBooking('Razorpay');
      setBookingSuccessData(confirmedData);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsBookingInProgress(false);
    }
  };

  return (
    <section id="quick-booking-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-30 mb-16">
      {/* Container Card */}
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200/80 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-100">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-950 flex items-center gap-2">
              <Ticket className="w-5.5 h-5.5 text-brand-red" />
              Quick Ticket Booking
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Book your tickets in seconds with live availability</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold bg-zinc-50 px-3.5 py-1.5 rounded-lg border border-zinc-150 text-zinc-600">
            <span>Powered by CineVerse DirectPay</span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookNowSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 items-end">
            {/* 1. Select Movie */}
            <div className="lg:col-span-1">
              <Dropdown
                label="Select Movie"
                placeholder="Choose movie"
                options={MOVIES_DATA}
                value={booking.movie}
                onChange={handleMovieChange}
                icon={Film}
              />
            </div>

            {/* 2. Select Date */}
            <div className="lg:col-span-1">
              <Dropdown
                label="Select Date"
                placeholder="Choose date"
                options={dates}
                value={booking.date}
                onChange={handleDateChange}
                icon={Calendar}
              />
            </div>

            {/* 3. Select Cinema */}
            <div className="lg:col-span-1">
              <Dropdown
                label="Select Cinema"
                placeholder="Choose cinema"
                options={CINEMAS_DATA}
                value={booking.cinema}
                onChange={handleCinemaChange}
                icon={MapPin}
                searchable={true}
              />
            </div>

            {/* 4. Select Showtime */}
            <div className="lg:col-span-1">
              <Dropdown
                label="Select Showtime"
                placeholder="Choose showtime"
                options={SHOWTIMES_DATA}
                value={booking.showtime}
                onChange={handleShowtimeChange}
                icon={Clock}
              />
            </div>

            {/* 5. Submit Button */}
            <div className="lg:col-span-1">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 font-bold tracking-wide shadow-md shadow-brand-red/10 cursor-pointer"
                loading={isBookingInProgress}
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal Simulation (Future backend & Razorpay checkout integration) */}
      {bookingSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl border border-zinc-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-zinc-950 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="font-display font-bold text-lg tracking-wide">Booking Confirmed!</span>
              </div>
              <span className="text-xs bg-zinc-800 text-zinc-300 font-mono px-2.5 py-1 rounded">
                Ticket ID: {bookingSuccessData.id}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Movie info */}
              <div className="flex gap-4 pb-4 border-b border-zinc-150">
                <img
                  src={bookingSuccessData.movie.poster}
                  alt={bookingSuccessData.movie.title}
                  className="w-16 h-24 rounded-lg object-cover border border-zinc-200 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-lg text-zinc-950 leading-snug">{bookingSuccessData.movie.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{bookingSuccessData.movie.genre}</p>
                  <p className="text-xs font-semibold text-zinc-700 mt-1.5">{bookingSuccessData.movie.duration} • {bookingSuccessData.movie.censorRating || 'UA'}</p>
                </div>
              </div>

              {/* Tickets Details Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Cinema</span>
                  <span className="font-bold text-zinc-800">{bookingSuccessData.cinema.name}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Date & Showtime</span>
                  <span className="font-bold text-zinc-800">
                    {bookingSuccessData.date.fullDateString || bookingSuccessData.date.dateNum + ' ' + bookingSuccessData.date.monthLabel}
                    <br />
                    <span className="text-brand-red">{bookingSuccessData.showtime}</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Selected Seats</span>
                  <span className="font-bold text-zinc-800 font-mono">{bookingSuccessData.seats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Status / Payment</span>
                  <span className="flex items-center gap-1.5 font-bold text-green-700">
                    <CreditCard className="w-3.5 h-3.5 text-green-600" />
                    <span>Paid via {bookingSuccessData.paymentMethod}</span>
                  </span>
                </div>
              </div>

              {/* Architecture Integration Notice */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-xs text-zinc-500 space-y-2">
                <p className="font-bold text-zinc-700">Backend & Payment Integration Prep:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Razorpay Transaction:</strong> Verified transaction <span className="font-mono">{bookingSuccessData.paymentId}</span></li>
                  <li><strong>MongoDB Schema:</strong> Booking schema payload successfully cached in local state context.</li>
                  <li><strong>Firebase Auth Link:</strong> Transaction linked to anonymous/logged-in session.</li>
                </ul>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="bg-zinc-50 px-6 py-4.5 border-t border-zinc-150 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => {
                  setBookingSuccessData(null);
                  clearBooking();
                }}
              >
                Book More
              </Button>
              <Button
                variant="secondary"
                className="flex-1 cursor-pointer flex items-center justify-center gap-1"
                onClick={() => {
                  setBookingSuccessData(null);
                  clearBooking();
                  // Simulate navigating to dashboard
                  alert('Navigating to simulated User Booking History Dashboard...');
                }}
              >
                Go to Dashboard
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickBooking;
