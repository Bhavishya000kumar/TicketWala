import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import QuickBooking from '../components/QuickBooking';
import NowShowing from '../components/NowShowing';
import ComingSoon from '../components/ComingSoon';
import Experiences from '../components/Experiences';
import TrailersShowcase from '../components/TrailersShowcase';
import Offers from '../components/Offers';
import { ShieldCheck, Award, HeartHandshake, PhoneCall } from 'lucide-react';

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <QuickBooking />
      <NowShowing />
      <ComingSoon />
      <Experiences />
      <TrailersShowcase />
      <Offers />
      
      {/* Premium Trust Bar */}
      <section className="bg-white border-t border-zinc-150 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <ShieldCheck className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-950">100% Secure Checkout</h3>
                <p className="text-xs text-zinc-500 mt-1">Prepped for Razorpay and SSL-grade transaction protocols.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <Award className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-950">Premium Cinema Tech</h3>
                <p className="text-xs text-zinc-500 mt-1">IMAX, 4DX, Luxe and Dolby Atmos screening options.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <HeartHandshake className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-950">Seamless Rescheduling</h3>
                <p className="text-xs text-zinc-500 mt-1">Easy cancellations and ticket swaps in your dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <PhoneCall className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-950">24/7 CineVerse Support</h3>
                <p className="text-xs text-zinc-500 mt-1">Instant support for corporate bookings and refunds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
