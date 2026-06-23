import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOW_SHOWING_MOVIES, COMING_SOON_MOVIES } from '../data/movies';
import Button from '../components/ui/Button';
import { Star, Clock, Calendar, Search, Film, SlidersHorizontal } from 'lucide-react';

const Movies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'now-showing', 'coming-soon'
  const [selectedGenre, setSelectedGenre] = useState('All');

  const allMovies = [
    ...NOW_SHOWING_MOVIES.map(m => ({ ...m, status: 'now-showing' })),
    ...COMING_SOON_MOVIES.map(m => ({ ...m, status: 'coming-soon' }))
  ];

  // Extract unique genres
  const genres = ['All', ...new Set(allMovies.flatMap(m => m.genre.split(' / ')))];

  // Filter movies
  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || movie.status === activeTab;
    const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesTab && matchesGenre;
  });

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left font-sans space-y-8 min-h-[70vh]">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-zinc-950 font-display tracking-tight flex items-center gap-3">
          <Film className="w-8 h-8 text-brand-red" />
          Browse Movies
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Explore current blockbusters and highly anticipated upcoming releases.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white border border-zinc-200 p-5 rounded-xl shadow-sm">
        {/* Left: Tab Selectors */}
        <div className="flex items-center bg-zinc-100 p-1.5 rounded-lg w-full lg:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'
            }`}
          >
            All Movies
          </button>
          <button
            onClick={() => setActiveTab('now-showing')}
            className={`flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'now-showing' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Now Showing
          </button>
          <button
            onClick={() => setActiveTab('coming-soon')}
            className={`flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'coming-soon' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Coming Soon
          </button>
        </div>

        {/* Right: Search & Genre Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search bar */}
          <div className="relative flex-grow sm:w-64">
            <input
              type="text"
              placeholder="Search movie titles, genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg text-sm bg-zinc-50 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
          </div>

          {/* Genre select */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 border border-zinc-200 rounded-lg text-sm bg-zinc-50 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all text-zinc-700 font-medium cursor-pointer"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Movie Cards Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
              className="group flex flex-col bg-white rounded-xl border border-zinc-200/60 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Poster container with hover effect */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Status Badges */}
                {movie.status === 'now-showing' ? (
                  <div className="absolute top-3 left-3 bg-zinc-950/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/10 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 shrink-0" />
                    <span>{movie.rating}</span>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-brand-red text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{movie.releaseDate.split(',')[0]}</span>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="p-4.5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-zinc-950 leading-snug group-hover:text-brand-red transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <span>{movie.language.split(',')[0]}</span>
                    {movie.duration && (
                      <>
                        <span className="text-zinc-300">•</span>
                        <span>{movie.duration}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{movie.genre}</p>
                </div>

                {/* View Details Action */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(movie.id);
                  }}
                  className="w-full font-bold group-hover:bg-brand-red group-hover:text-white group-hover:border-transparent transition-all duration-300 py-2 cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center max-w-lg mx-auto space-y-3 shadow-sm">
          <Film className="w-12 h-12 text-zinc-300 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-950">No movies found</h3>
          <p className="text-sm text-zinc-500">We couldn't find any movies matching "{searchTerm}" or selected filters. Try broadening your criteria!</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setActiveTab('all');
              setSelectedGenre('All');
            }}
            className="mt-2"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Movies;
