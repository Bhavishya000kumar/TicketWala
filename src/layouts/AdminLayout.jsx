import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Film, LogOut, BarChart3, Database, CalendarDays, ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Analytics & Revenue', path: '/admin', icon: BarChart3 },
    { label: 'Movie Catalog CRUD', path: '/admin?tab=movies', icon: Film },
    { label: 'Theatre Management', path: '/admin?tab=theatres', icon: Database },
    { label: 'Showtime Manager', path: '/admin?tab=showtimes', icon: CalendarDays },
    { label: 'Campaigns & Coupons', path: '/admin?tab=offers', icon: ShieldAlert }
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-950 text-white shrink-0 flex flex-col justify-between">
        <div className="p-6 space-y-8">
          {/* Brand header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-red p-2 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                CineVerse <span className="text-xs bg-brand-red text-white px-2 py-0.5 rounded font-mono uppercase">Admin</span>
              </span>
            </div>
          </div>

          {/* Menu links list */}
          <nav className="flex flex-col space-y-1 text-left">
            {menuItems.map((item) => {
              const isActive = location.pathname + location.search === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-red text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="p-6 border-t border-zinc-900 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Homepage
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4.5 h-4.5 text-zinc-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-zinc-200 h-16 flex items-center justify-between px-6 md:px-8">
          <h2 className="font-bold text-zinc-800 text-sm hidden md:block">System Status: Active</h2>
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-xs font-bold text-zinc-900">{user?.name || 'Admin Officer'}</p>
              <p className="text-[10px] text-zinc-400 font-mono">System Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center font-bold text-xs text-brand-red uppercase">
              {user?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Outlets Container */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
