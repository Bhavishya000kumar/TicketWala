import React from 'react';
import { OFFERS } from '../data/offers';
import OfferCard from './OfferCard';

const Offers = () => {
  return (
    <section id="offers" className="bg-zinc-50 border-y border-zinc-150 py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
            Exclusive Offers & Promotions
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Get the best value deals on booking movie tickets with our banking and partner offers</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
