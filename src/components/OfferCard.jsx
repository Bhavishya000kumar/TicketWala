import React, { useState } from 'react';
import Button from './ui/Button';
import { Copy, Check, Calendar, ArrowRight } from 'lucide-react';

const OfferCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-xl border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row text-left">
      {/* Promo Image banner */}
      <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-zinc-100 shrink-0">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        {/* Category Tag overlay */}
        <div className="absolute top-3 left-3 bg-zinc-950/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
          {offer.tag}
        </div>
      </div>

      {/* Offer Details */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4 md:w-3/5">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-zinc-950 leading-snug group-hover:text-brand-red transition-colors">
            {offer.title}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {offer.description}
          </p>
        </div>

        {/* Promo Actions row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">{offer.expiry}</span>
          </div>

          <div className="flex items-center gap-2">
            <code className="bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded text-xs font-mono font-bold text-zinc-700">
              {offer.code}
            </code>
            <button
              onClick={handleCopyCode}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                copied
                  ? 'bg-green-50 border-green-200 text-green-600'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
              title="Copy Code"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
