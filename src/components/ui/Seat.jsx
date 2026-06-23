import React from 'react';

/**
 * Reusable Seat component for CineVerse interactive theatre layout
 * @param {{
 *   id: string,
 *   status: 'available' | 'selected' | 'reserved' | 'locked',
 *   category: 'VIP' | 'Executive' | 'Standard',
 *   price: number,
 *   onClick: Function
 * }} props
 */
const Seat = ({ id, status, category, price, onClick }) => {
  // Base classes
  let bgClass = 'bg-white border text-zinc-650';
  let borderClass = 'border-zinc-200 hover:border-zinc-400';
  let cursorClass = 'cursor-pointer hover:bg-zinc-50';
  let textClass = 'text-[9px] font-bold';

  // Apply category specific highlights for available status
  if (status === 'available') {
    if (category === 'VIP') {
      borderClass = 'border-amber-400 text-amber-700 hover:bg-amber-50';
    } else if (category === 'Executive') {
      borderClass = 'border-blue-400 text-blue-700 hover:bg-blue-50';
    } else {
      borderClass = 'border-zinc-300 text-zinc-600 hover:bg-zinc-100';
    }
  }

  // Apply state specific overrides
  if (status === 'selected') {
    bgClass = 'bg-brand-red text-white border-transparent';
    cursorClass = 'cursor-pointer';
    borderClass = '';
  } else if (status === 'reserved') {
    bgClass = 'bg-zinc-200 text-zinc-400 border-transparent';
    cursorClass = 'cursor-not-allowed opacity-40';
    borderClass = '';
  } else if (status === 'locked') {
    bgClass = 'bg-orange-100 text-orange-700 border-orange-300 border-dashed';
    cursorClass = 'cursor-not-allowed opacity-80 animate-pulse';
  }

  const handleSeatClick = () => {
    if (status === 'reserved' || status === 'locked') return;
    onClick(id, price);
  };

  return (
    <button
      type="button"
      onClick={handleSeatClick}
      disabled={status === 'reserved' || status === 'locked'}
      className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red select-none ${bgClass} ${borderClass} ${cursorClass} ${textClass}`}
      title={`${id} (${category} - Rs. ${price})`}
    >
      {id}
    </button>
  );
};

export default Seat;
