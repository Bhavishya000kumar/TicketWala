import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
