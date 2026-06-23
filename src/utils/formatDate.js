// CineVerse DateTime Formatting Utilities

/**
 * Generate an array of next 7 calendar dates starting today
 * @returns {Array<{id: string, dayLabel: string, dateNum: number, monthLabel: string, fullDateString: string}>}
 */
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
      fullDateString: nextDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    });
  }
  
  return dates;
};

/**
 * Format timestamp to friendly readability
 * @param {string} isoString 
 * @returns {string} e.g. "Jun 23, 2026 at 12:30 PM"
 */
export const formatFriendlyDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
