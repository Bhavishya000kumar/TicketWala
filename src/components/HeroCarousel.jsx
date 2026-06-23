import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { MOVIES_DATA } from '../services/api';
import { useBooking } from '../context/BookingContext';
import Button from './ui/Button';
import { Play, Calendar, Clock, Star, X } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
  const { selectMovie } = useBooking();
  const [activeTrailerUrl, setActiveTrailerUrl] = useState(null);

  const handleBookNow = (movie) => {
    // Set selected movie in booking context
    selectMovie(movie);
    // Smooth scroll to the booking section
    const bookingSection = document.getElementById('quick-booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        className="w-full min-h-[500px] md:min-h-[600px] lg:h-[650px]"
      >
        {MOVIES_DATA.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full flex items-center">
            {/* Backdrop Image with gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-[5000ms] ease-out"
              />
              {/* Radial gradient to darken edges, linear gradient to blend bottom */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/70 to-zinc-950 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50 z-10" />
            </div>

            {/* Split Content Layout */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full h-full flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left Side: Movie Details */}
              <div className="flex-1 text-left space-y-6 max-w-xl md:max-w-2xl">
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded">
                    {movie.censorRating}
                  </span>
                  <span className="bg-zinc-800/80 text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded">
                    {movie.language}
                  </span>
                  <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 px-2.5 py-0.5 rounded text-yellow-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-500" />
                    <span>{movie.rating} / 10</span>
                  </div>
                </div>

                {/* Movie Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-md">
                  {movie.title}
                </h1>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-red" />
                    <span>{movie.runtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <span>{movie.releaseDate}</span>
                  </div>
                  <span className="text-zinc-400">|</span>
                  <span className="text-zinc-300">{movie.genre}</span>
                </div>

                {/* Synopsis */}
                <p className="text-base text-zinc-300 font-normal leading-relaxed max-w-xl drop-shadow">
                  {movie.synopsis}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleBookNow(movie)}
                    className="font-bold tracking-wide cursor-pointer"
                  >
                    BOOK NOW
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    icon={Play}
                    iconPosition="left"
                    onClick={() => setActiveTrailerUrl(movie.trailerUrl)}
                    className="bg-transparent border-white hover:bg-white hover:text-zinc-950 text-white font-bold tracking-wide cursor-pointer transition-all"
                  >
                    WATCH TRAILER
                  </Button>
                </div>
              </div>

              {/* Right Side: Movie Poster */}
              <div className="w-48 sm:w-60 md:w-72 lg:w-80 shrink-0 self-center md:self-auto hidden sm:block">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300 hover:scale-105">
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="text-sm font-semibold tracking-wider text-white">IN CINEMAS NOW</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Video Trailer Modal */}
      {activeTrailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <button
              onClick={() => setActiveTrailerUrl(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-zinc-900/80 hover:bg-brand-red rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`${activeTrailerUrl}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
