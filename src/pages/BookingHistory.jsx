import React from 'react';
import { useBooking } from '../hooks/useBooking';
import { formatFriendlyDateTime } from '../utils/formatDate';
import Button from '../components/ui/Button';
import { Ticket, Calendar, Clock, MapPin, Printer, ShieldCheck, AlertCircle } from 'lucide-react';

const BookingHistory = () => {
  const { bookingHistory } = useBooking();

  const handlePrintTicket = (ticketId) => {
    alert(`Generating high-fidelity PDF invoice receipt for Ticket ${ticketId}...`);
  };

  if (bookingHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto" />
        <h1 className="text-2xl font-bold text-zinc-950 font-display">No Bookings Found</h1>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">You have not booked any movie tickets yet. Explore movies now on the home screen.</p>
        <Button variant="primary" onClick={() => window.location.href = '/'}>Browse Now Showing</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left font-sans space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-950 font-display tracking-tight">Your Tickets</h1>
        <p className="text-sm text-zinc-500 mt-1">Review confirmed ticket codes and print booking transaction invoices.</p>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {bookingHistory.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row hover:border-zinc-300 transition-all duration-200"
          >
            {/* Poster left */}
            <div className="md:w-1/4 aspect-[16/10] md:aspect-auto overflow-hidden bg-zinc-900 shrink-0">
              <img
                src={ticket.movie.poster}
                alt={ticket.movie.title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Details right */}
            <div className="p-6 md:w-3/4 flex flex-col justify-between space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] bg-zinc-950 text-white font-mono px-2 py-0.5 rounded">ID: {ticket.id}</span>
                  <h3 className="font-bold text-lg text-zinc-950 leading-tight pt-1.5">{ticket.movie.title}</h3>
                  <p className="text-xs text-zinc-500">{ticket.movie.genre}</p>
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Confirmed
                </span>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs text-zinc-650 font-semibold border-t border-b border-zinc-100 py-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-zinc-400 block uppercase">Cinema</span>
                  <span className="text-zinc-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="truncate">{ticket.cinema.name.split(',')[0]}</span>
                  </span>
                </div>
                
                <div className="space-y-0.5">
                  <span className="text-[9px] text-zinc-400 block uppercase">Date & Timing</span>
                  <span className="text-zinc-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{ticket.date.fullDateString || ticket.date.dateNum + ' ' + ticket.date.monthLabel}</span>
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] text-zinc-400 block uppercase">Seats & Show</span>
                  <span className="text-brand-red flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{ticket.seats.join(', ')} ({ticket.showtime})</span>
                  </span>
                </div>
              </div>

              {/* Actions row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="text-zinc-400">
                  <span>Transaction: <span className="font-mono text-zinc-500 font-bold">{ticket.paymentId}</span></span>
                  <span className="block text-[10px] mt-0.5">Booked on: {formatFriendlyDateTime(ticket.bookingTime)}</span>
                </div>

                <div className="flex gap-2">
                  <code className="bg-zinc-50 border border-zinc-200 px-3 py-2 rounded text-zinc-700 font-mono font-bold flex items-center justify-center">
                    Paid Rs. {ticket.amount}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Printer}
                    onClick={() => handlePrintTicket(ticket.id)}
                    className="cursor-pointer"
                  >
                    Print Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
