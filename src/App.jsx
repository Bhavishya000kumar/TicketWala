import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import QuickBooking from './components/QuickBooking';
import Button from './components/ui/Button';
import { Film, Award, ShieldCheck, HeartHandshake, PhoneCall, ChevronRight } from 'lucide-react';

// Main Homepage View
const Home = () => {
  return (
    <>
      <HeroCarousel />
      <QuickBooking />
      
      {/* Premium Trust Bar & Cinema Features (Inspired by premium PVR/INOX features) */}
      <section className="bg-white border-y border-zinc-150 py-10 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-950">100% Secure Checkout</h3>
                <p className="text-xs text-zinc-500 mt-1">Prepped for Razorpay and SSL-grade transaction protocols</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-950">Premium Cinema Tech</h3>
                <p className="text-xs text-zinc-500 mt-1">IMAX, 4DX, Insignia and Director's Cut screening options</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-950">Seamless Rescheduling</h3>
                <p className="text-xs text-zinc-500 mt-1">Easy cancellations and ticket swaps in your dashboard</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-brand-red">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-950">24/7 CineVerse Support</h3>
                <p className="text-xs text-zinc-500 mt-1">Instant support for corporate bookings and refunds</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// High-Fidelity Page Placeholder preparing for future routes & backend connection
const RoutePlaceholder = ({ title, description, nextSteps = [] }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-flex bg-zinc-100 text-zinc-600 p-4.5 rounded-2xl border border-zinc-200">
        <Film className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">{title}</h1>
      <p className="text-base text-zinc-600 max-w-lg mx-auto">{description}</p>
      
      {/* Integration roadmap details */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 text-left max-w-xl mx-auto shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-zinc-800 uppercase tracking-wider">Architecture Roadmap:</h3>
        <ul className="space-y-2 text-sm text-zinc-500">
          {nextSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-brand-red font-semibold shrink-0">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4">
        <Link to="/">
          <Button variant="secondary" size="md">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Main Layout Wrap
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>{children}</main>
      </div>

      {/* Modern, Clean Minimalist Footer */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="bg-brand-red p-2 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  Cine<span className="text-brand-red">Verse</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500">Premium Cinema Booking Platform</p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Support Helpline</a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
            <span>© {new Date().getFullYear()} CineVerse Entertainment Ltd. All rights reserved.</span>
            <span>Made with precision for high-volume transactions.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Day 1 Homepage Router */}
              <Route path="/" element={<Home />} />
              
              {/* Future Integration Mock Routes */}
              <Route 
                path="/movies" 
                element={
                  <RoutePlaceholder 
                    title="Movie Catalog Module" 
                    description="Future integration point for fetching movies, tags, filter cards, and search endpoints directly from a Node/Express backend powered by MongoDB."
                    nextSteps={[
                      "Implement category pills (Now Showing, Coming Soon, IMAX, etc.)",
                      "Build paginated list layouts with dynamic search query filters",
                      "Connect with Movie schemas dynamically populated from the database"
                    ]}
                  />
                } 
              />
              <Route 
                path="/cinemas" 
                element={
                  <RoutePlaceholder 
                    title="Cinemas Finder & Showtimes" 
                    description="Integrated mapping module showing cinemas location, amenities lists, and detailed showtimes schedule grids."
                    nextSteps={[
                      "Integrate Google Maps / Leaflet API for proximity mapping",
                      "Build calendar scheduler to view seat statuses for subsequent days",
                      "Implement fast query schemas for specific cinema halls"
                    ]}
                  />
                } 
              />
              <Route 
                path="/offers" 
                element={
                  <RoutePlaceholder 
                    title="Promotional Deals & Coupons" 
                    description="Promo engine matching user card attributes to payment gateways and validating coupon hashes."
                    nextSteps={[
                      "Create validation service API endpoints for discount codes",
                      "Bind credit card bank offers to active checkout stages",
                      "Setup push notification hooks for premium membership ticket sales"
                    ]}
                  />
                } 
              />
              <Route 
                path="/seats" 
                element={
                  <RoutePlaceholder 
                    title="Seat Selection & Booking Module" 
                    description="Interactive seat grid mapping theatre layout categories (VIP, Executive, Recliner) with live WebSocket state updates."
                    nextSteps={[
                      "Build interactive SVG/Canvas screen seat grid mapping database templates",
                      "Establish socket connection to prevent seat-locking conflicts between concurrent bookings",
                      "Validate chosen seats structure during API pre-checkout validations"
                    ]}
                  />
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
