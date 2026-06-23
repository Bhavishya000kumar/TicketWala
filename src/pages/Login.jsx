import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { Mail, Lock, Film, Sparkles } from 'lucide-react';

const Login = () => {
  const { login, loginWithFirebase } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Extract redirect parameter
  const queryParams = new URLSearchParams(location.search);
  const isExpired = queryParams.get('expired') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // Redirect based on role
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseLogin = async () => {
    setLoading(true);
    try {
      await loginWithFirebase();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50">
      <div className="max-w-md w-full space-y-8 bg-white border border-zinc-200 p-8 rounded-xl shadow-sm text-left">
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-brand-red p-2.5 rounded-lg text-white mx-auto">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-950 font-display">Sign in to CineVerse</h2>
          <p className="text-xs text-zinc-400">Unlock advance screenings booking, vouchers, and seat updates</p>
        </div>

        {isExpired && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 font-bold text-center">
            Your login session expired. Please sign in again.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600 font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-brand-red"
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-[10px] text-zinc-400">Tip: Type <code>admin@cineverse.com</code> to enter Admin Panel.</p>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-brand-red"
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            loading={loading}
            className="w-full py-3 font-bold cursor-pointer"
          >
            Sign In with JWT
          </Button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-semibold">
            <span className="bg-white px-3 text-zinc-400">Or Continue With</span>
          </div>
        </div>

        {/* Social auth */}
        <Button
          type="button"
          variant="outline"
          onClick={handleFirebaseLogin}
          className="w-full py-3 font-bold cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-brand-red fill-current" />
          Authenticate via Firebase Provider
        </Button>

        {/* Link to Register */}
        <div className="text-center text-xs text-zinc-500 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-red font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
