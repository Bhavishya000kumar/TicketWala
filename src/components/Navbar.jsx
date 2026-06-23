import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CITIES_DATA } from '../services/api';
import Dropdown from './ui/Dropdown';
import Button from './ui/Button';
import { Search, MapPin, Menu, X, Film, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, loginWithFirebase, logout } = useAuth();
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Movies', href: '#movies' },
    { label: 'Cinemas', href: '#cinemas' },
    { label: 'Offers', href: '#offers' },
    { label: 'Trailers', href: '#trailers' }
  ];

  const handleLoginClick = async () => {
    try {
      await loginWithFirebase();
      alert('Mock Login Successful via Firebase Provider!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white border-b border-zinc-100 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-red p-2.5 rounded-xl shadow-md shadow-brand-red/10 flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-zinc-950 font-display">
                Cine<span className="text-brand-red">Verse</span>
              </span>
            </div>

            {/* Center: Main Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-zinc-600 hover:text-brand-red transition-colors duration-200 relative py-1.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-red after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Search, City, Auth */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-56 xl:w-64">
                <input
                  type="text"
                  placeholder="Search movies, cinemas..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all text-zinc-800 placeholder-zinc-400"
                />
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
              </div>

              {/* City Selector */}
              <div className="w-44">
                <Dropdown
                  options={CITIES_DATA}
                  value={selectedCity}
                  onChange={(city) => setSelectedCity(city)}
                  placeholder="Select City"
                  icon={MapPin}
                  searchable={true}
                />
              </div>

              {/* Login/User Authentication button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200 cursor-pointer"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-300">
                        <User className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-zinc-700 max-w-[80px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in duration-150">
                      <div className="px-4 py-2 border-b border-zinc-100">
                        <p className="text-xs text-zinc-400">Signed in as</p>
                        <p className="text-sm font-semibold text-zinc-800 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-zinc-400" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="outline" size="md" onClick={handleLoginClick}>
                  Login
                </Button>
              )}
            </div>

            {/* Hamburger Button (Mobile & Tablet) */}
            <div className="flex lg:hidden items-center gap-3">
              {/* City selector icon wrapper for tablet */}
              <div className="sm:block hidden w-36">
                <Dropdown
                  options={CITIES_DATA}
                  value={selectedCity}
                  onChange={(city) => setSelectedCity(city)}
                  placeholder="City"
                  icon={MapPin}
                />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-600 hover:text-zinc-950 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-100 shadow-inner px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, cinemas..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white text-zinc-800"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
            </div>

            {/* Mobile City Selector (visible only on mobile, hidden on tablet since tablet shows it in navbar) */}
            <div className="sm:hidden block">
              <Dropdown
                options={CITIES_DATA}
                value={selectedCity}
                onChange={(city) => {
                  setSelectedCity(city);
                }}
                placeholder="Select City"
                icon={MapPin}
              />
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-zinc-700 hover:text-brand-red hover:bg-zinc-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile auth action */}
            <div className="pt-2 border-t border-zinc-100">
              {user ? (
                <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                        <User className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-zinc-800">{user.name}</p>
                      <p className="text-xs text-zinc-500 truncate max-w-[150px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 text-zinc-500 hover:text-brand-red"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Button variant="primary" className="w-full py-3" onClick={handleLoginClick}>
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
