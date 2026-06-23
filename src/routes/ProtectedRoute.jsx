import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Route protection wrapper component
 * @param {{ children: React.ReactElement, requireAdmin: boolean }} props
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans text-xs text-zinc-400 animate-pulse">
        Checking authentication session...
      </div>
    );
  }

  // Redirect to login if user not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect standard users away from admin pages
  if (requireAdmin && user.role !== 'admin') {
    console.warn('[ProtectedRoute] Non-admin access attempt blocked.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
