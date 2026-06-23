import React from 'react';
import { EXPERIENCES } from '../data/experiences';
import Button from './ui/Button';
import { ArrowUpRight } from 'lucide-react';

const Experiences = () => {
  const handleExplore = (title) => {
    alert(`Redirecting to detail features, galleries, and seat specifications for ${title}...`);
  };

  return (
    <section id="cinemas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      {/* Title Header */}
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
          Premium Cinema Experiences
        </h2>
        <p className="text-sm text-zinc-500 mt-1">Upgrade your movie watching experience with our premium screen formats</p>
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="group flex flex-col bg-white rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-left"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
            </div>

            {/* Content Details */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-zinc-950 tracking-tight group-hover:text-brand-red transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExplore(exp.title)}
                  className="w-full font-bold flex items-center justify-center gap-1 cursor-pointer group-hover:bg-zinc-900 group-hover:text-white group-hover:border-transparent transition-all duration-200"
                >
                  Explore Features
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
