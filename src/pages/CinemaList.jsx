import React from 'react';
import { Link } from 'react-router-dom';
import { CINEMAS_DATA, SHOWTIMES_DATA } from '../services/api';
import { useBooking } from '../hooks/useBooking';
import { MapPin, Film, Search, Ticket } from 'lucide-react';

const CinemaList = () => {
  const { selectCinema, selectShowtime } = useBooking();

  const handleShowtimeClick = (cinema, slot) => {
    selectCinema(cinema);
    selectShowtime(slot);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left font-sans space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-950 font-display tracking-tight">Cinemas Near You</h1>
        <p className="text-sm text-zinc-500 mt-1">Check currently active cinema venues, layouts, and slot schedules.</p>
      </div>

      {/* Filter / Search Row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-zinc-200 p-4 rounded-xl shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search theatres..."
            className="w-full pl-10 pr-4 py-2 border border-zinc-250 rounded-lg text-sm focus:outline-none focus:border-brand-red"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
        </div>
        <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-brand-red" />
          Showing theatres in selected city
        </span>
      </div>

      {/* Theatres list */}
      <div className="space-y-6">
        {CINEMAS_DATA.map((cinema) => (
          <div
            key={cinema.id}
            className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-sm hover:border-zinc-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            {/* Left: Cinema Info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="bg-brand-red/10 p-2 rounded-lg text-brand-red">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-zinc-900 tracking-tight">{cinema.name}</h3>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1 pl-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{cinema.location} • Premium Screening Hall</span>
              </p>
            </div>

            {/* Right: Showtimes allocation row */}
            <div className="w-full md:w-auto shrink-0 text-left md:text-right space-y-3">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Screen Timings</span>
              <div className="flex flex-wrap gap-2">
                {SHOWTIMES_DATA.map((slot, idx) => (
                  <Link
                    key={idx}
                    to="/seats"
                    onClick={() => handleShowtimeClick(cinema, slot)}
                    className="border border-zinc-200 hover:border-brand-red bg-zinc-50 hover:bg-brand-red hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold text-zinc-700 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Ticket className="w-3 h-3" />
                    <span>{slot}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaList;
