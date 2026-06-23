import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MovieDetails from '../pages/MovieDetails';
import CinemaList from '../pages/CinemaList';
import SeatSelection from '../pages/SeatSelection';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import BookingHistory from '../pages/BookingHistory';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC AND USER PATHWAYS (MainLayout) */}
      <Route path="/" element={<MainLayout />}>
        {/* Homepage */}
        <Route index element={<Home />} />
        
        {/* Movies listings & descriptions */}
        <Route path="movies" element={<Movies />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="cinemas" element={<CinemaList />} />
        
        {/* Seating coordinates selection */}
        <Route path="seats" element={<SeatSelection />} />
        
        {/* Auth Forms */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Secure User pages (Requires login session) */}
        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="bookings" 
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* 2. SECURE ADMIN PORTAL PATHWAYS (AdminLayout) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* 3. FALLBACK PATHWAYS */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
