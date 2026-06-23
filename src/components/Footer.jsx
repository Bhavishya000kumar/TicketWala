import React from 'react';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 font-sans">
      {/* Top Banner: Newsletter signup / Promo */}
      <div className="border-b border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-white font-bold text-lg tracking-wide">Subscribe to CineVerse Club</h4>
            <p className="text-xs text-zinc-500">Get early access alerts for blockbusters, advanced seat bookings, and partner offers.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-red w-full"
            />
            <button
              onClick={() => alert('Subscribed to CineVerse Club! Check your inbox for exclusive vouchers.')}
              className="bg-brand-red hover:bg-brand-red-dark text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Col 1: Brand & About */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-red p-2.5 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Cine<span className="text-brand-red">Verse</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-500 font-normal">
            CineVerse is a premier cinema booking network, offering state-of-the-art projection formats (IMAX, 4DX), premium dining options, and seamless ticketing operations across major metropolitan regions.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3.5 pt-2">
            <a href="#" className="p-2 bg-zinc-900 hover:bg-brand-red hover:text-white rounded-lg text-zinc-500 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-900 hover:bg-brand-red hover:text-white rounded-lg text-zinc-500 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-900 hover:bg-brand-red hover:text-white rounded-lg text-zinc-500 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-900 hover:bg-brand-red hover:text-white rounded-lg text-zinc-500 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Explore Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Home Page</a></li>
            <li><a href="#movies" className="hover:text-white transition-colors">Now Showing Movies</a></li>
            <li><a href="#cinemas" className="hover:text-white transition-colors">Cinemas & Venues</a></li>
            <li><a href="#offers" className="hover:text-white transition-colors">Promos & Offers</a></li>
            <li><a href="#trailers" className="hover:text-white transition-colors">Latest Trailers</a></li>
          </ul>
        </div>

        {/* Col 3: Cinema Hubs */}
        <div className="space-y-4 text-left">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Cinemas list</h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li>Delhi NCR - Ambience Mall</li>
            <li>Mumbai - Inorbit Mall</li>
            <li>Pune - Seasons Mall</li>
            <li>Bengaluru - Nexus Mall</li>
            <li>Hyderabad - Forum Sujana</li>
          </ul>
        </div>

        {/* Col 4: Contact & Help */}
        <div className="space-y-4 text-left">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Contact & Support</h4>
          <ul className="space-y-3.5 text-xs">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-red shrink-0" />
              <span className="text-zinc-500">CineVerse HQ, Connaught Place, New Delhi - 110001</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-brand-red shrink-0" />
              <span>1800-419-8800 (Toll Free)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-red shrink-0" />
              <a href="mailto:support@cineverse.com" className="hover:text-white transition-colors">support@cineverse.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-600">
          <span>© {new Date().getFullYear()} CineVerse Entertainment Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Security Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
