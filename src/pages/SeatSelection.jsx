import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import Seat from '../components/ui/Seat';
import Button from '../components/ui/Button';
import { socket } from '../socket/socketClient';
import { ShieldCheck, Armchair, Info, ChevronRight, AlertCircle } from 'lucide-react';

const SeatSelection = () => {
  const { booking, toggleSeat, clearBooking } = useBooking();
  const navigate = useNavigate();
  const [reservedSeats, setReservedSeats] = useState(['C4', 'C5', 'F12', 'F13', 'A7', 'H3']);
  const [lockedSeats, setLockedSeats] = useState(['B3']);

  // Connect to WebSockets to sync live seat changes
  useEffect(() => {
    socket.connect();
    
    // Register socket listener
    const handleSeatStatus = (data) => {
      console.log('[WebSocket] Live seat update received:', data);
      if (data.status === 'locked') {
        setLockedSeats(prev => [...prev, data.seatId]);
      }
    };
    socket.on('seatStatusChanged', handleSeatStatus);

    return () => {
      socket.off('seatStatusChanged', handleSeatStatus);
      socket.disconnect();
    };
  }, []);

  // Generate rows layout
  const rows = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const columnsCount = 14;

  const getSeatCategory = (row) => {
    if (row === 'H' || row === 'G') return { label: 'VIP', price: 400 };
    if (row === 'F' || row === 'E' || row === 'D' || row === 'C') return { label: 'Executive', price: 250 };
    return { label: 'Standard', price: 180 };
  };

  const handleSeatClick = (seatId, price) => {
    // Notify websocket server of seat locking activity
    socket.emit('lockSeat', {
      seatId,
      showtimeId: booking.showtime || 'st_123',
      userId: 'user_123'
    });
    toggleSeat(seatId, price);
  };

  if (!booking.movie || !booking.cinema || !booking.showtime) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto" />
        <h1 className="text-2xl font-bold text-zinc-950 font-display">No Session Active</h1>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">Please select a movie, cinema, and showtime slot from the homepage or theatres search list.</p>
        <Link to="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Ticket Header summary */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">Booking Screen</span>
            <h2 className="text-xl font-bold text-zinc-950">{booking.movie.title}</h2>
            <p className="text-xs text-zinc-500">
              {booking.cinema.name} • <span className="text-brand-red font-semibold">{booking.showtime}</span>
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">Change Show</Button>
          </Link>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 bg-white border border-zinc-200 p-4.5 rounded-xl shadow-sm text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-zinc-300 bg-white" />
            <span className="text-zinc-500">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-brand-red" />
            <span className="text-zinc-550">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-zinc-200" />
            <span className="text-zinc-400">Sold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300 border-dashed animate-pulse" />
            <span className="text-zinc-500">Locked (Other User)</span>
          </div>
          <div className="w-px h-4 bg-zinc-200" />
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-amber-400 bg-amber-50" />
            <span className="text-amber-800">VIP (Rs. 400)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-blue-400 bg-blue-50" />
            <span className="text-blue-800">Exec (Rs. 250)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-zinc-300 bg-zinc-50" />
            <span className="text-zinc-600">Std (Rs. 180)</span>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="bg-white border border-zinc-200 rounded-xl py-12 px-4 shadow-sm flex flex-col items-center overflow-x-auto">
          {/* Seat Grid Map */}
          <div className="space-y-3 min-w-[500px]">
            {rows.map((row) => {
              const { label, price } = getSeatCategory(row);
              return (
                <div key={row} className="flex items-center gap-3">
                  {/* Row indicator */}
                  <span className="w-6 text-xs font-bold text-zinc-400 text-left">{row}</span>
                  
                  {/* Grid seats */}
                  <div className="flex gap-2">
                    {Array.from({ length: columnsCount }).map((_, colIdx) => {
                      const colNum = colIdx + 1;
                      const seatId = `${row}${colNum}`;
                      
                      // Spacers for cinema aisles (after seat 3 and 11)
                      const isSpacer = colNum === 4 || colNum === 12;
                      
                      // Check status
                      let status = 'available';
                      if (booking.selectedSeats.includes(seatId)) status = 'selected';
                      else if (reservedSeats.includes(seatId)) status = 'reserved';
                      else if (lockedSeats.includes(seatId)) status = 'locked';

                      return (
                        <React.Fragment key={seatId}>
                          {isSpacer && <div className="w-6" />}
                          <Seat
                            id={seatId}
                            status={status}
                            category={label}
                            price={price}
                            onClick={handleSeatClick}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Screen curve indicator */}
          <div className="w-80 md:w-[450px] mt-16 text-center space-y-2">
            <div className="w-full h-2 bg-zinc-300 rounded-full shadow-inner shadow-zinc-400/50" />
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Screen This Way</span>
          </div>
        </div>

        {/* Checkout bottom summary panel */}
        {booking.selectedSeats.length > 0 && (
          <div className="bg-zinc-950 text-white rounded-xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 animate-in slide-in-from-bottom duration-300">
            <div className="text-center md:text-left space-y-1.5">
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">Pricing Summary</span>
              <p className="text-base font-bold">
                {booking.selectedSeats.length} Ticket(s) selected: <span className="font-mono text-brand-red">{booking.selectedSeats.join(', ')}</span>
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-zinc-400">
                <span>Subtotal: Rs. {booking.totalAmount}</span>
                <span>•</span>
                <span>GST (18%): Rs. {Math.round(booking.totalAmount * 0.18)}</span>
              </div>
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-zinc-500 block">FINAL BILL</span>
                <span className="text-xl font-extrabold text-white font-mono">Rs. {Math.round(booking.totalAmount * 1.18)}</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto font-bold tracking-wide flex items-center justify-center gap-1 cursor-pointer"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
                <ChevronRight className="w-4.5 h-4.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
