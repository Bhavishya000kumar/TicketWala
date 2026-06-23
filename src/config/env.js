// CineVerse Environment Configuration
// Validates and maps environment variables for the Vite build system.

export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  RAZORPAY_KEY: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_mockkey12345',
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'cineverse-mock-cloud',
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'mock-firebase-key',
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cineverse-mock.firebaseapp.com',
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cineverse-mock',
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cineverse-mock.appspot.com',
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:mockappid'
  },
  IS_PRODUCTION: import.meta.env.PROD || false
};
