// Centralized Seats Database for CineVerse
// Generates a standard layout of 6 rows (A-F) by 10 columns (1-10).

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const bookedSeats = ['A3', 'A4', 'B5', 'C7', 'C8', 'D2', 'E5', 'F9', 'F10'];

export const SEATS_DATA = [];

rows.forEach(row => {
  let type = 'regular';
  if (row === 'A' || row === 'B') {
    type = 'recliner';
  } else if (row === 'C' || row === 'D') {
    type = 'premium';
  }

  for (let num = 1; num <= 10; num++) {
    const id = `${row}${num}`;
    SEATS_DATA.push({
      id,
      row,
      number: num,
      type,
      status: bookedSeats.includes(id) ? 'booked' : 'available'
    });
  }
});

export default SEATS_DATA;
