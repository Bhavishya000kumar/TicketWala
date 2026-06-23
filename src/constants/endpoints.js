// CineVerse Backend Endpoints Configuration
// Centralizes route bindings to prevent path deviations in service integrations.

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FIREBASE_SYNC: '/auth/firebase-sync'
  },
  MOVIES: {
    LIST: '/movies',
    DETAIL: (id) => `/movies/${id}`,
    CREATE: '/movies/admin/create',
    UPDATE: (id) => `/movies/admin/update/${id}`,
    DELETE: (id) => `/movies/admin/delete/${id}`,
    UPLOADS: '/movies/admin/upload-cloudinary'
  },
  CINEMAS: {
    LIST: '/cinemas',
    DETAIL: (id) => `/cinemas/${id}`,
    CREATE: '/cinemas/admin/create'
  },
  SHOWTIMES: {
    LIST: '/showtimes',
    BY_MOVIE: (movieId) => `/showtimes/movie/${movieId}`,
    BY_CINEMA: (cinemaId) => `/showtimes/cinema/${cinemaId}`,
    CREATE: '/showtimes/admin/create'
  },
  BOOKINGS: {
    CREATE: '/bookings/create-order',
    VERIFY: '/bookings/verify-payment',
    HISTORY: '/bookings/user-history',
    SEAT_STATUS: (showtimeId) => `/bookings/seats/${showtimeId}`
  },
  OFFERS: {
    LIST: '/offers',
    VALIDATE: '/offers/validate'
  },
  REVIEWS: {
    BY_MOVIE: (movieId) => `/reviews/movie/${movieId}`,
    ADD: '/reviews/add',
    DELETE: (id) => `/reviews/delete/${id}`
  }
};

export default ENDPOINTS;
