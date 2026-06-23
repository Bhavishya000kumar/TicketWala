import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../services/movie.service';
import { showtimeService } from '../services/showtime.service';
import { reviewService } from '../services/review.service';
import { useBooking } from '../hooks/useBooking';
import Button from '../components/ui/Button';
import { Star, Clock, Calendar, ShieldCheck, Heart, User, Play, ChevronRight, MessageSquareCode } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const { selectMovie, selectShowtime } = useBooking();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieById(id);
        setMovie(data);
        
        const slots = await showtimeService.getShowtimesByMovie(id);
        setShowtimes(slots);
        
        const feed = await reviewService.getReviewsByMovie(id);
        setReviews(feed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  const handleShowtimeClick = (slot) => {
    if (movie) {
      selectMovie(movie);
      selectShowtime(slot);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-sm font-semibold text-zinc-400 animate-pulse">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-800">Oops! Movie details unavailable.</h2>
        <p className="text-sm text-zinc-500">{error || 'Movie not found.'}</p>
        <Link to="/" className="text-xs text-brand-red font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  // Mock cast members
  const castList = [
    { name: 'Lead Actor', role: 'Main Protagonist', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { name: 'Co-Star Actress', role: 'Supporting Partner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { name: 'Lead Antagonist', role: 'Primary Rival', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100' },
    { name: 'Character Actor', role: 'Sidekick Friend', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' }
  ];

  return (
    <div className="font-sans">
      {/* 1. Backdrop banner */}
      <div className="relative bg-zinc-950 text-white py-16 md:py-24 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover opacity-25 object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-center text-left">
          {/* Poster */}
          <div className="w-48 sm:w-56 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img src={movie.poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
          </div>

          {/* Core Info */}
          <div className="space-y-5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded">UA</span>
              <div className="flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 text-yellow-500 font-bold px-2 py-0.5 rounded text-xs">
                <Star className="w-3.5 h-3.5 fill-yellow-500" />
                <span>{movie.rating} / 10</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display">{movie.title}</h1>
            
            <p className="text-sm text-zinc-300 font-medium">{movie.genre} • {movie.duration}</p>
            <p className="text-xs text-zinc-400">Release date: {movie.releaseDate} • languages: {movie.language}</p>

            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" size="md" onClick={() => {
                const scrollTarget = document.getElementById('showtimes-selector');
                if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
              }}>
                BOOK TICKETS
              </Button>
              <Button variant="outline" size="md" icon={Play} className="bg-transparent text-white border-white hover:bg-white hover:text-zinc-950" onClick={() => setActiveTrailerUrl(movie.trailerUrl)}>
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10 text-left">
        {/* Left Columns: Synopsis, Cast, Reviews */}
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-zinc-900 font-display uppercase tracking-wide">About the Movie</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{movie.description}</p>
          </div>

          {/* Cast */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-display uppercase tracking-wide">Cast Members</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {castList.map((actor, idx) => (
                <div key={idx} className="bg-white p-3 border border-zinc-200 rounded-xl flex items-center gap-3 shadow-sm">
                  <img src={actor.avatar} alt={actor.name} className="w-10 h-10 rounded-full object-cover border border-zinc-150" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-zinc-800 line-clamp-1">{actor.name}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-display uppercase tracking-wide">User Reviews</h3>
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600 uppercase">
                        {rev.userName[0]}
                      </div>
                      <span className="text-xs font-bold text-zinc-800">{rev.userName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{rev.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Showtimes booking widget */}
        <div id="showtimes-selector" className="lg:col-span-1 space-y-6 scroll-mt-24">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-base text-zinc-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-red" />
                Select Show Time
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Book tickets for today's dynamic screenings</p>
            </div>

            {/* Showtime Timing Chips */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-1.5">Available Slots</h4>
              <div className="flex flex-wrap gap-2.5">
                {showtimes.map((slot, idx) => (
                  <Link
                    key={idx}
                    to="/seats"
                    onClick={() => handleShowtimeClick(slot)}
                    className="flex-1 min-w-[90px] text-center border border-zinc-200 hover:border-brand-red bg-zinc-50 hover:bg-brand-red hover:text-white px-3 py-2 rounded-lg text-xs font-bold text-zinc-700 transition-all cursor-pointer"
                  >
                    {slot}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust notes */}
            <div className="pt-2 border-t border-zinc-150 space-y-2.5 text-xs text-zinc-500">
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Instant confirmation tickets generated dynamically in user dashboard.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal Player */}
      {activeTrailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 animate-in zoom-in-95 duration-200">
            <button onClick={() => setActiveTrailerUrl(null)} className="absolute top-4 right-4 z-50 p-2 bg-zinc-900/80 hover:bg-brand-red rounded-full text-white transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <iframe src={`${activeTrailerUrl}?autoplay=1`} title="Trailer Stream" className="w-full h-full border-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
