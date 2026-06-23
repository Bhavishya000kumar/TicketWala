// CineVerse Booking & Transaction Type Definitions
// Defines payloads for booking history, checkout states, and seat arrays.

/**
 * @typedef {Object} BookingDateOption
 * @property {string} id - Identifier tag
 * @property {string} dayLabel - Day of week abbreviation (e.g. MON)
 * @property {number} dateNum - Calendar day of month
 * @property {string} monthLabel - Calendar month abbreviation (e.g. Jun)
 * @property {string} fullDateString - Localized full date details
 */

/**
 * @typedef {Object} SeatReservation
 * @property {string} seatId - Coordinate position (e.g. A1, A2)
 * @property {string} category - Class tier (VIP, Executive, Recliner)
 * @property {number} price - Ticket cost amount
 * @property {string} status - Seat state (Available, Selected, Reserved, Locked)
 */

/**
 * @typedef {Object} TransactionBooking
 * @property {string} id - Ticket code (e.g. CV_A3D9E)
 * @property {Object} movie - Booked movie metadata (id, title, poster)
 * @property {BookingDateOption} date - Target screening day
 * @property {Object} cinema - Theater hall reference (id, name, location)
 * @property {string} showtime - Timing choice (e.g. 06:15 PM)
 * @property {string[]} seats - Ticket coordinate arrays
 * @property {number} amount - Final transaction billing
 * @property {string} paymentId - Razorpay capture ID
 * @property {string} paymentMethod - Pay vendor (Razorpay, DirectPay)
 * @property {string} bookingTime - ISO Booking stamp
 * @property {string} status - Checkout state (Confirmed, Refunded)
 */

export default {};
