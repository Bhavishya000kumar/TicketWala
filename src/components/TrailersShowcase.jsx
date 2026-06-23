import React, { useState } from 'react';
import { TRAILERS } from '../data/trailers';
import { Play, X, Clock } from 'lucide-react';

const TrailersShowcase = () => {
  const [activeTrailerUrl, setActiveTrailerUrl] = useState(null);

  return (
    <section id="trailers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      {/* Title Header */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
          Latest Movie Trailers
        </h2>
        <p className="text-sm text-zinc-500 mt-1">Watch trailers for the most anticipated releases and trending movies</p>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex items-center gap-6 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-zinc-300">
        {TRAILERS.map((trailer) => (
          <div
            key={trailer.id}
            className="group flex-none w-72 sm:w-80 cursor-pointer text-left"
            onClick={() => setActiveTrailerUrl(trailer.trailerUrl)}
          >
            {/* Thumbnail Card */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-zinc-200 bg-zinc-900 mb-3.5">
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Dark tint overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-300" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 group-hover:bg-brand-red text-zinc-900 group-hover:text-white p-3.5 rounded-full shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                {trailer.duration}
              </div>
            </div>

            {/* Info details */}
            <div className="px-1 space-y-0.5">
              <h3 className="font-bold text-sm text-zinc-900 group-hover:text-brand-red transition-colors line-clamp-1">
                {trailer.title}
              </h3>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                {trailer.genre}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Iframe Player */}
      {activeTrailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveTrailerUrl(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-zinc-900/80 hover:bg-brand-red rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`${activeTrailerUrl}?autoplay=1`}
              title="CineVerse Trailer Stream"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrailersShowcase;
