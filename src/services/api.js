// CineVerse Central API / Data Bridge
// Imports data from isolated files to maintain scalability.

import { NOW_SHOWING_MOVIES } from '../data/movies';
import { CITIES } from '../data/cities';
import { CINEMAS } from '../data/cinemas';

export const MOVIES_DATA = NOW_SHOWING_MOVIES;
export const CINEMAS_DATA = CINEMAS;
export const CITIES_DATA = CITIES;

export { getBookingDates } from '../utils/formatDate';

export const SHOWTIMES_DATA = [
  '09:45 AM',
  '12:30 PM',
  '03:45 PM',
  '06:15 PM',
  '07:30 PM',
  '09:00 PM',
  '10:45 PM'
];
