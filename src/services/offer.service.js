// CineVerse Campaigns & Offers validation services
// Validates coupon discount thresholds against mock database files.

import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';
import { OFFERS } from '../data/offers';

export const offerService = {
  getAllOffers: async () => {
    try {
      return await apiClient.get(ENDPOINTS.OFFERS.LIST);
    } catch (err) {
      console.warn('[OfferService] Node API offers list unavailable. Loading local campaign codes...');
      return OFFERS;
    }
  },

  /**
   * Verify coupon code eligibility
   * @param {string} code 
   * @param {number} cartTotal 
   * @returns {Promise<{valid: boolean, discount: number}>}
   */
  validateCoupon: async (code, cartTotal) => {
    try {
      return await apiClient.post(ENDPOINTS.OFFERS.VALIDATE, { code, cartTotal });
    } catch (err) {
      console.warn(`[OfferService] Node API validation bypassed. Validating code "${code}" locally...`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const match = OFFERS.find(o => o.code.toLowerCase() === code.toLowerCase());
          if (match) {
            // Apply mock rules: CINECC20 gets 20% off, CINESTUDENT gets Rs 150 off, etc.
            let discount = 0;
            if (match.code === 'CINECC20') discount = Math.round(cartTotal * 0.20);
            else if (match.code === 'CINESTUDENT') discount = 150;
            else if (match.code === 'CINEBOGO') discount = 250; // flat ticket cost
            else if (match.code === 'FESTIVAL35') discount = Math.round(cartTotal * 0.35);

            resolve({ valid: true, discount, message: 'Promo code applied successfully!' });
          } else {
            reject(new Error('Invalid coupon code or expired voucher.'));
          }
        }, 300);
      });
    }
  }
};

export default offerService;
