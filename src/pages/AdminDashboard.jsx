import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/movie.service';
import { offerService } from '../services/offer.service';
import { CINEMAS_DATA, SHOWTIMES_DATA } from '../services/api';
import Button from '../components/ui/Button';
import { Film, Plus, Trash2, Edit3, Settings, TrendingUp, Users, Ticket, IndianRupee, ImageUp, Sparkles, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'analytics';

  const [movies, setMovies] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for new movie
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newRating, setNewRating] = useState('9.0');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const showList = await movieService.getAllNowShowing();
      setMovies(showList);
      const promoList = await offerService.getAllOffers();
      setOffers(promoList);
    };
    loadData();
  }, []);

  const handleAddMovieSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newGenre) return;

    const newMovie = {
      id: 'm_' + Math.random().toString(36).substring(2, 6),
      title: newTitle,
      genre: newGenre,
      language: newLang || 'English',
      duration: newDuration || '2h 15m',
      rating: newRating,
      releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop', // default premium fallback
      banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
      trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
      description: newDesc
    };

    setMovies(prev => [newMovie, ...prev]);
    setIsAddingMovie(false);
    
    // Clear inputs
    setNewTitle('');
    setNewGenre('');
    setNewLang('');
    setNewDuration('');
    setNewDesc('');

    setSuccessMsg('Movie added successfully! Linked to Cloudinary media files.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDeleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="font-sans text-left space-y-8">
      {/* Tab Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-950 font-display capitalize">
            {activeTab === 'analytics' ? 'Analytics & Business Insights' : `${activeTab} Management`}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">System dashboard monitor and inventory controller panels.</p>
        </div>

        {activeTab === 'movies' && !isAddingMovie && (
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddingMovie(true)}>
            Add New Movie
          </Button>
        )}
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Render Active Tab */}
      
      {/* 1. ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Business stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Total Sales Revenue</span>
                <span className="text-2xl font-extrabold text-zinc-900 font-mono">Rs. 8,42,150</span>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-xl border border-green-150">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Confirmed Reservations</span>
                <span className="text-2xl font-extrabold text-zinc-900 font-mono">2,341</span>
              </div>
              <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl border border-brand-red/15">
                <Ticket className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Average Occupancy</span>
                <span className="text-2xl font-extrabold text-zinc-900 font-mono">68.4%</span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-150">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Registered Cinephiles</span>
                <span className="text-2xl font-extrabold text-zinc-900 font-mono">4,128</span>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-150">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Graphical placeholder */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Weekly Bookings Trajectory</h3>
            <div className="h-64 bg-zinc-50 border border-zinc-200 border-dashed rounded-lg flex items-center justify-center text-zinc-400 text-xs font-semibold">
              [Visual Revenue Charts Component. Integrated with MongoDB aggregation pipelines on Day 3]
            </div>
          </div>
        </div>
      )}

      {/* 2. MOVIES CRUD TAB */}
      {activeTab === 'movies' && (
        <div className="space-y-6">
          {/* Add movie form */}
          {isAddingMovie && (
            <div className="bg-white border border-zinc-250 rounded-xl p-6 shadow-md animate-in slide-in-from-top duration-250">
              <h3 className="font-bold text-base text-zinc-950 uppercase tracking-wide border-b border-zinc-100 pb-3 mb-5">
                Register New Blockbuster
              </h3>
              
              <form onSubmit={handleAddMovieSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Movie Title</label>
                  <input
                    type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-sm py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Genre Categories</label>
                  <input
                    type="text" placeholder="e.g. Action / Sci-Fi" required value={newGenre} onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full text-sm py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Languages</label>
                  <input
                    type="text" placeholder="e.g. English, Hindi" value={newLang} onChange={(e) => setNewLang(e.target.value)}
                    className="w-full text-sm py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Duration</label>
                  <input
                    type="text" placeholder="e.g. 2h 30m" value={newDuration} onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full text-sm py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Movie Synopsis</label>
                  <textarea
                    rows="3" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-sm py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                
                {/* Cloudinary placeholder upload */}
                <div className="sm:col-span-2 bg-zinc-50 border border-zinc-200 border-dashed rounded-lg p-5 text-center cursor-pointer hover:bg-zinc-100/50 transition-colors">
                  <div className="flex flex-col items-center gap-2 text-zinc-400 text-xs font-semibold">
                    <ImageUp className="w-8 h-8 text-zinc-400" />
                    <span>Upload Poster & Banner to Cloudinary</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Supports JPEG, PNG up to 5MB</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-zinc-100">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingMovie(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" size="sm">Save Movie</Button>
                </div>
              </form>
            </div>
          )}

          {/* Movies list table */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-zinc-500">
                <thead className="text-xs uppercase bg-zinc-50 text-zinc-700 border-b border-zinc-200 font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="px-6 py-4">Genre</th>
                    <th scope="col" className="px-6 py-4">Duration</th>
                    <th scope="col" className="px-6 py-4">Rating</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 font-medium">
                  {movies.map((m) => (
                    <tr key={m.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-zinc-900">{m.title}</td>
                      <td className="px-6 py-4">{m.genre}</td>
                      <td className="px-6 py-4">{m.duration}</td>
                      <td className="px-6 py-4 text-amber-500">★ {m.rating}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-1.5 text-zinc-400 hover:text-brand-red transition-colors cursor-pointer">
                          <Edit3 className="w-4.5 h-4.5" />
                        </button>
                        <button onClick={() => handleDeleteMovie(m.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer">
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. THEATRES TAB */}
      {activeTab === 'theatres' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Cinema Halls Allocation</h3>
          <div className="space-y-4">
            {CINEMAS_DATA.map((cinema) => (
              <div key={cinema.id} className="flex justify-between items-center bg-zinc-50 border border-zinc-150 p-4 rounded-lg">
                <span className="font-bold text-sm text-zinc-800">{cinema.name} ({cinema.location})</span>
                <span className="text-xs bg-zinc-200 text-zinc-600 px-2.5 py-1 rounded-full font-bold">Standard Layout (112 Seats)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SHOWTIMES TAB */}
      {activeTab === 'showtimes' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Allocated Screening Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOWTIMES_DATA.map((slot, idx) => (
              <div key={idx} className="bg-zinc-50 border border-zinc-150 p-4 rounded-lg flex items-center justify-between text-xs font-semibold">
                <span className="font-bold text-zinc-800">{slot} slot</span>
                <span className="text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">Active Show</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. OFFERS TAB */}
      {activeTab === 'offers' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">Coupon Vouchers list</h3>
          <div className="space-y-4">
            {offers.map((off) => (
              <div key={off.id} className="flex justify-between items-center bg-zinc-50 border border-zinc-150 p-4 rounded-lg">
                <div className="text-left space-y-1">
                  <span className="font-bold text-sm text-zinc-800">{off.title}</span>
                  <span className="text-[10px] text-zinc-400 block">Voucher Code: <code className="font-bold text-zinc-700">{off.code}</code></span>
                </div>
                <span className="text-xs bg-brand-red/10 text-brand-red px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">{off.tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
