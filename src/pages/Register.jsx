import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { Mail, Lock, User, Film } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white border border-zinc-200 p-8 rounded-xl shadow-sm text-left">
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-brand-red p-2.5 rounded-lg text-white mx-auto">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-950 font-display">Create an Account</h2>
          <p className="text-xs text-zinc-400">Sign up to get discounts, alerts, and reservation receipts.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600 font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Rohan Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-brand-red"
              />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="rohan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-brand-red"
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            </div>
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
            Register Account
          </Button>
        </form>

        {/* Link to Login */}
        <div className="text-center text-xs text-zinc-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-red font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
