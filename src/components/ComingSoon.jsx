import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMING_SOON_MOVIES } from '../data/movies';
import Button from './ui/Button';
import { Bell, Calendar, CheckCircle2, X } from 'lucide-react';

const ComingSoon = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-close toast notification after 4 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleNotifyMe = (movieTitle) => {
    setToastMessage(`Alert activated! We will notify you when tickets open for ${movieTitle}`);
  };

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <section className="bg-zinc-50 border-y border-zinc-150 py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
            Coming Soon
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Get ready for these highly anticipated blockbusters arriving soon</p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {COMING_SOON_MOVIES.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
              className="group flex bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md hover:border-zinc-300 transition-all duration-300 cursor-pointer"
            >
              {/* Left Side: Poster */}
              <div className="w-1/2 aspect-[2/3] overflow-hidden bg-zinc-100 shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Right Side: Movie Details */}
              <div className="w-1/2 p-4 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  {/* Release Date Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-brand-red/10 text-brand-red px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    <span>{movie.releaseDate.split(',')[0]}</span>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-950 leading-snug line-clamp-2 group-hover:text-brand-red transition-colors">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-zinc-400">
                    {movie.genre.split(' / ')[0]} • {movie.language.split(',')[0]}
                  </p>

                  <p className="text-[11px] text-zinc-500 line-clamp-3 leading-normal">
                    {movie.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Bell}
                    iconPosition="left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotifyMe(movie.title);
                    }}
                    className="w-full font-bold py-1.5 text-xs cursor-pointer hover:bg-zinc-900 hover:text-white hover:border-transparent transition-all duration-200"
                  >
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-zinc-900 text-white rounded-lg shadow-2xl border border-zinc-800 p-4 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <div className="flex-grow text-left">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">CineVerse Alerts</h4>
            <p className="text-xs text-zinc-300 mt-1 leading-normal">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ComingSoon;
