import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movie.service';
import Button from '../components/ui/Button';
import { Star, Clock, Calendar, Film, Play, X, AlertTriangle, ArrowLeft, User } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import { THEATRES } from '../data/theatres';
import { SHOWTIMES } from '../data/showtimes';

const CastMember = ({ actor }) => {
  const [imgError, setImgError] = useState(false);
  
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3 shadow-md transition-all hover:border-zinc-700">
      {!imgError && actor.avatar ? (
        <img
          src={actor.avatar}
          alt={actor.name}
          onError={() => setImgError(true)}
          className="w-12 h-12 rounded-full object-cover border border-zinc-800 shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-zinc-850 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 font-bold text-xs tracking-wider">
          {getInitials(actor.name)}
        </div>
      )}
      <div className="truncate">
        <p className="text-xs font-bold text-white truncate">{actor.name}</p>
        <p className="text-[10px] text-zinc-400 truncate mt-0.5">{actor.role}</p>
      </div>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    selectedTheatre, 
    selectTheatre,
    selectedDate,
    selectedShowtime,
    selectDate,
    selectShowtime
  } = useBooking();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Movie not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Loading skeleton screen to prevent layout shifts
  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans pb-16">
        {/* Banner Skeleton (Reduced Height) */}
        <div className="relative h-[240px] md:h-[360px] bg-zinc-900 animate-pulse overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>

        {/* Content Skeleton */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 z-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Poster Skeleton */}
          <div className="w-48 sm:w-56 shrink-0 aspect-[2/3] bg-zinc-800 rounded-xl border border-zinc-800 shadow-2xl animate-pulse" />
          
          {/* Details Skeleton */}
          <div className="space-y-4 max-w-2xl w-full pt-4 md:pt-14">
            <div className="h-4 bg-zinc-800 w-1/4 rounded animate-pulse" />
            <div className="h-10 bg-zinc-800 w-3/4 rounded animate-pulse" />
            <div className="h-5 bg-zinc-800 w-1/2 rounded animate-pulse" />
            <div className="h-4 bg-zinc-800 w-2/3 rounded animate-pulse" />
          </div>
        </div>

        {/* Details & Cast Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-3">
              <div className="h-6 bg-zinc-900 w-1/3 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-zinc-900 w-full rounded animate-pulse" />
                <div className="h-4 bg-zinc-900 w-5/6 rounded animate-pulse" />
                <div className="h-4 bg-zinc-900 w-2/3 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-zinc-900 w-1/4 rounded animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-zinc-900 border border-zinc-900 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Movie Not Found screen
  if (error || !movie) {
    return (
      <div className="bg-zinc-950 min-h-[90vh] text-zinc-100 flex flex-col items-center justify-center px-4 font-sans py-20 text-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="mx-auto w-16 h-16 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight font-display text-white">Movie Not Found</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We couldn't retrieve details for this movie. It may have been removed, or the URL ID might be invalid.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-3"
              icon={ArrowLeft}
            >
              Back To Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/movies')}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-center gap-2 py-3"
              icon={Film}
            >
              Browse Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const generateNext7Days = () => {
    const dates = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      let label = '';
      if (i === 0) {
        label = 'Today';
      } else if (i === 1) {
        label = 'Tomorrow';
      } else {
        label = daysOfWeek[d.getDay()];
      }
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${day}`;
      
      const dateString = `${months[d.getMonth()]} ${d.getDate()}`;
      
      dates.push({
        label,
        value: isoDate,
        dateString
      });
    }
    return dates;
  };

  const next7Days = generateNext7Days();

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans pb-16">
      {/* 1. Backdrop Banner Section (Reduced Height) */}
      <div className="relative h-[240px] sm:h-[300px] md:h-[390px] overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0">
          <img
            src={movie.banner || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        
        {/* Mobile quick watch trailer option overlay */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden z-10">
          <button
            onClick={() => setIsTrailerOpen(true)}
            className="p-4 bg-brand-red/90 text-white rounded-full hover:bg-brand-red shadow-lg transition-transform hover:scale-105"
            aria-label="Play Trailer"
          >
            <Play className="w-8 h-8 fill-current" />
          </button>
        </div>
      </div>

      {/* 2. Core Movie Details Overlaid Panel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end text-left">
          {/* Large High-Res Poster */}
          <div className="w-40 sm:w-48 md:w-56 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>

          {/* Core metadata panel */}
          <div className="space-y-4 flex-grow">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-brand-red text-white text-[11px] font-bold px-2 py-0.5 rounded">
                UA
              </span>
              {movie.rating && (
                <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold px-2 py-0.5 rounded text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-500" />
                  <span>{movie.rating} / 10</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white drop-shadow">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400 font-medium">
              <span>{movie.genre}</span>
              {movie.duration && (
                <>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-red" />
                    <span>{movie.duration}</span>
                  </div>
                </>
              )}
              {movie.releaseDate && (
                <>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-red" />
                    <span>{movie.releaseDate}</span>
                  </div>
                </>
              )}
            </div>

            {movie.director && (
              <p className="text-sm font-semibold text-zinc-300">
                Director: <span className="text-white font-bold">{movie.director}</span>
              </p>
            )}

            {/* Watch Trailer Desktop Button */}
            <div className="pt-2 hidden md:block">
              <Button
                variant="outline"
                size="md"
                icon={Play}
                iconPosition="left"
                className="bg-transparent text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 transition-all font-bold"
                onClick={() => setIsTrailerOpen(true)}
              >
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Synopsis and Cast Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
        {/* Left column: About & Cast */}
        <div className="lg:col-span-2 space-y-12">
          {/* About the movie */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display border-l-4 border-brand-red pl-3 tracking-wide uppercase">
              Synopsis
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-normal">
              {movie.description || 'No description available for this movie.'}
            </p>
          </div>

          {/* Cast grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-display border-l-4 border-brand-red pl-3 tracking-wide uppercase">
              Principal Cast
            </h3>
            
            {movie?.cast && movie.cast.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {movie.cast.map((actor, idx) => (
                  <CastMember key={idx} actor={actor} />
                ))}
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-900 p-6 rounded-xl text-center">
                <p className="text-sm text-zinc-400 italic">Cast information unavailable</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Technical Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800/50 rounded-xl p-6 shadow-lg space-y-4">
            <h4 className="font-bold text-base text-white tracking-tight border-b border-zinc-800 pb-3 uppercase font-display">
              Movie Details
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/30">
                <span className="text-zinc-500">Language</span>
                <span className="text-zinc-200 font-semibold">{movie.language || 'English'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/30">
                <span className="text-zinc-500">Format</span>
                <span className="text-zinc-200 font-semibold">IMAX 2D, 2D</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/30">
                <span className="text-zinc-500">Certificate</span>
                <span className="text-zinc-200 font-semibold">UA</span>
              </div>
              {movie.duration && (
                <div className="flex justify-between py-1 border-b border-zinc-800/30">
                  <span className="text-zinc-500">Duration</span>
                  <span className="text-zinc-200 font-semibold">{movie.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Available Theatres Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-zinc-900 text-left">
        <h3 className="text-xl font-bold text-white font-display border-l-4 border-brand-red pl-3 tracking-wide uppercase mb-8">
          Available Theatres
        </h3>
        
        {!THEATRES || THEATRES.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-900 p-8 rounded-xl text-center">
            <p className="text-sm text-zinc-400 italic">No theatres available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {THEATRES.map((theatre) => {
              const isSelected = selectedTheatre?.id === theatre.id;
              return (
                <div
                  key={theatre.id}
                  onClick={() => selectTheatre(isSelected ? null : theatre)}
                  className={`relative group bg-zinc-900/40 border p-5.5 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[170px] ${
                    isSelected 
                      ? 'border-brand-red ring-2 ring-brand-red/35 shadow-lg shadow-brand-red/10' 
                      : 'border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-sm text-white group-hover:text-brand-red transition-colors line-clamp-1">
                        {theatre.name}
                      </h4>
                      {isSelected && (
                        <span className="shrink-0 bg-brand-red text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      {theatre.location}
                    </p>
                    {/* Facilities tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {theatre.facilities?.slice(0, 3).map((facility, fIdx) => (
                        <span key={fIdx} className="text-[9px] bg-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded font-medium">
                          {facility}
                        </span>
                      ))}
                      {theatre.facilities?.length > 3 && (
                        <span className="text-[9px] text-zinc-500 font-medium self-center pl-0.5">
                          +{theatre.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/40 mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Experience
                    </span>
                    <span className="bg-zinc-800/90 text-zinc-300 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      {theatre.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Available Dates Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-zinc-900 text-left">
        <h3 className="text-xl font-bold text-white font-display border-l-4 border-brand-red pl-3 tracking-wide uppercase mb-8">
          Available Dates
        </h3>
        
        <div className="flex flex-wrap gap-4">
          {next7Days.map((dateObj) => {
            const isSelected = selectedDate?.value === dateObj.value;
            return (
              <div
                key={dateObj.value}
                onClick={() => selectDate(isSelected ? null : dateObj)}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 min-w-[90px] border ${
                  isSelected 
                    ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20 scale-105' 
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider mb-1">
                  {dateObj.label}
                </span>
                <span className={`text-base font-extrabold font-display ${isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                  {dateObj.dateString}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Available Showtimes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-zinc-900 text-left">
        <h3 className="text-xl font-bold text-white font-display border-l-4 border-brand-red pl-3 tracking-wide uppercase mb-8">
          Available Showtimes
        </h3>
        
        {!SHOWTIMES || SHOWTIMES.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-900 p-8 rounded-xl text-center">
            <p className="text-sm text-zinc-400 italic">No showtimes available</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {SHOWTIMES.map((showtimeObj) => {
              const isSelected = selectedShowtime?.id === showtimeObj.id;
              return (
                <div
                  key={showtimeObj.id}
                  onClick={() => selectShowtime(isSelected ? null : showtimeObj)}
                  className={`group px-6 py-3.5 rounded-xl cursor-pointer transition-all duration-300 border flex items-center justify-center font-bold text-sm ${
                    isSelected 
                      ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20 scale-105' 
                      : 'bg-zinc-900/40 border-zinc-850 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {showtimeObj.time}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Trailer Modal Player Overlay */}
      {isTrailerOpen && movie.trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-250">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 animate-in zoom-in-95 duration-200">
            {/* Close modal handle */}
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 z-50 p-2.5 bg-zinc-900/80 hover:bg-brand-red rounded-full text-white transition-colors cursor-pointer"
              aria-label="Close Trailer"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Frame Embed (NO autoplay for user control) */}
            <iframe
              src={movie.trailerUrl}
              title="Trailer Playback"
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

export default MovieDetails;
