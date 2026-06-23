// CineVerse Client-Side Authorization Middleware
// Handles route access validations and JWT expiry checks before component rendering.

export const authMiddleware = {
  /**
   * Verify if a JWT token exists and is syntactically valid (not expired)
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('cineverse_token');
    if (!token) return false;

    try {
      // Decode JWT payload locally to verify expiration
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return false;
      
      const payload = JSON.parse(atob(payloadBase64));
      const expTimestamp = payload.exp * 1000; // convert to ms
      
      return Date.now() < expTimestamp;
    } catch (err) {
      console.error('[AuthMiddleware] Token parse exception:', err);
      return false;
    }
  },

  /**
   * Check if the authenticated user possesses admin clearances
   * @param {Object} user - Context user object
   * @returns {boolean}
   */
  isAdmin: (user) => {
    return user && user.role === 'admin';
  }
};

export default authMiddleware;
