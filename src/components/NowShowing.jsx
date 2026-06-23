import React from 'react';
import { NOW_SHOWING_MOVIES } from '../data/movies';
import { useBooking } from '../context/BookingContext';
import Button from './ui/Button';
import { Star, Clock, Heart } from 'lucide-react';

const NowShowing = () => {
  const { selectMovie } = useBooking();

  const handleBookNow = (movie) => {
    selectMovie(movie);
    const bookingSection = document.getElementById('quick-booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="movies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
            Now Showing
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Explore current blockbuster movies playing in theatres now</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">Live Showtimes Available</span>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {NOW_SHOWING_MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="group flex flex-col bg-white rounded-xl border border-zinc-200/60 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 overflow-hidden"
          >
            {/* Poster container with hover effect */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay rating badge */}
              <div className="absolute top-3 left-3 bg-zinc-950/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/10 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 shrink-0" />
                <span>{movie.rating}</span>
              </div>

              {/* Heart/Favorite Icon */}
              <button 
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-zinc-600 hover:text-brand-red rounded-full backdrop-blur-sm transition-colors shadow-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Added ${movie.title} to your watchlist!`);
                }}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Movie Info */}
            <div className="p-4.5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-1.5 text-left">
                <h3 className="font-bold text-sm text-zinc-950 leading-snug group-hover:text-brand-red transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {movie.language}
                </p>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{movie.duration}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="truncate">{movie.genre.split(' / ')[0]}</span>
                </div>
              </div>

              {/* Booking Action */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBookNow(movie)}
                className="w-full font-bold group-hover:bg-brand-red group-hover:text-white group-hover:border-transparent transition-all duration-300 py-2 cursor-pointer"
              >
                Book Tickets
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NowShowing;
