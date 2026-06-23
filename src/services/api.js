// CineVerse Central API / Data Bridge
// Imports data from isolated files to maintain scalability.

import { NOW_SHOWING_MOVIES } from '../data/movies';
import { CITIES } from '../data/cities';
import { CINEMAS } from '../data/cinemas';

export const MOVIES_DATA = NOW_SHOWING_MOVIES;
export const CINEMAS_DATA = CINEMAS;
export const CITIES_DATA = CITIES;

export const SHOWTIMES_DATA = [
  '09:45 AM',
  '12:30 PM',
  '03:45 PM',
  '06:15 PM',
  '07:30 PM',
  '09:00 PM',
  '10:45 PM'
];

// Helper to generate next 7 days dynamically starting today
export const getBookingDates = () => {
  const dates = [];
  const today = new Date();
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    
    dates.push({
      id: `d_${i}`,
      dayLabel: i === 0 ? 'TODAY' : daysOfWeek[nextDate.getDay()],
      dateNum: nextDate.getDate(),
      monthLabel: months[nextDate.getMonth()],
      fullDateString: nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  
  return dates;
};
