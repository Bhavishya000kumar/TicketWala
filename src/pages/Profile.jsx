import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
import Button from '../components/ui/Button';
import { User, Mail, Shield, Ticket, Star, CalendarDays } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { bookingHistory } = useBooking();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left font-sans space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-950 font-display tracking-tight">Your Account</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage credentials, preferences, and view CineVerse stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* User Card */}
        <div className="md:col-span-1 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-red/10 border border-brand-red/20 mx-auto flex items-center justify-center font-bold text-2xl text-brand-red uppercase">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-zinc-900">{user?.name || 'CineVerse Guest'}</h3>
            <p className="text-xs text-zinc-400 font-mono">{user?.role === 'admin' ? 'Administrator' : 'Standard Member'}</p>
          </div>
        </div>

        {/* User profile list */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-zinc-950 uppercase tracking-wider border-b border-zinc-100 pb-3">User Information</h3>
            
            <div className="space-y-4.5 text-sm">
              <div className="flex items-center gap-3">
                <User className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-450 block font-semibold uppercase">Account Name</span>
                  <span className="font-bold text-zinc-800">{user?.name || 'Guest User'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-450 block font-semibold uppercase">Email Address</span>
                  <span className="font-bold text-zinc-800">{user?.email || 'guest@cineverse.com'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-450 block font-semibold uppercase">Security Permissions</span>
                  <span className="font-bold text-zinc-800 capitalize">{user?.role || 'user'} account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm text-center space-y-2">
              <Ticket className="w-6 h-6 text-brand-red mx-auto" />
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Booked Tickets</span>
                <span className="text-xl font-extrabold text-zinc-850 font-mono">{bookingHistory.length}</span>
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm text-center space-y-2">
              <Star className="w-6 h-6 text-yellow-500 mx-auto" />
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">CineVerse Rating</span>
                <span className="text-xl font-extrabold text-zinc-850 font-mono">Tier Gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
