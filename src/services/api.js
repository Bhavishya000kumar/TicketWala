// CineVerse Mock Data Service
// Easily swap out with MongoDB / Express API endpoints later.

export const MOVIES_DATA = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Adventure / Action',
    runtime: '2h 46m',
    releaseDate: 'March 1, 2024',
    rating: '9.3',
    censorRating: 'UA',
    language: 'English, Hindi, Tamil',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
  },
  {
    id: 'm2',
    title: 'Oppenheimer',
    genre: 'Biography / Drama / History',
    runtime: '3h 00m',
    releaseDate: 'July 21, 2023',
    rating: '9.5',
    censorRating: 'A',
    language: 'English, Hindi',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    backdropUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1600&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg'
  },
  {
    id: 'm3',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animation / Action / Adventure',
    runtime: '2h 20m',
    releaseDate: 'June 2, 2023',
    rating: '9.1',
    censorRating: 'U',
    language: 'English, Hindi, Tamil, Telugu',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg'
  },
  {
    id: 'm4',
    title: 'Interstellar',
    genre: 'Sci-Fi / Drama / Adventure',
    runtime: '2h 49m',
    releaseDate: 'November 7, 2014',
    rating: '9.6',
    censorRating: 'UA',
    language: 'English',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZATo3Es'
  },
  {
    id: 'm5',
    title: 'The Dark Knight',
    genre: 'Action / Crime / Drama',
    runtime: '2h 32m',
    releaseDate: 'July 18, 2008',
    rating: '9.7',
    censorRating: 'UA',
    language: 'English, Hindi',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY'
  }
];

export const CINEMAS_DATA = [
  { id: 'c1', name: 'PVR Director\'s Cut, Ambience Mall', location: 'Delhi NCR' },
  { id: 'c2', name: 'PVR Superplex, Logix City Centre', location: 'Delhi NCR' },
  { id: 'c3', name: 'INOX Insignia, Atria Mall', location: 'Mumbai' },
  { id: 'c4', name: 'INOX Megaplex, Inorbit Mall', location: 'Mumbai' },
  { id: 'c5', name: 'Cinepolis VIP, Seasons Mall', location: 'Pune' },
  { id: 'c6', name: 'Cinepolis IMAX, Forum Mall', location: 'Bengaluru' },
  { id: 'c7', name: 'CineVerse IMAX, Nexus Mall', location: 'Bengaluru' },
  { id: 'c8', name: 'PVR Forum Sujana, KPHB', location: 'Hyderabad' }
];

export const SHOWTIMES_DATA = [
  '09:45 AM',
  '12:30 PM',
  '03:45 PM',
  '06:15 PM',
  '07:30 PM',
  '09:00 PM',
  '10:45 PM'
];

export const CITIES_DATA = [
  'Delhi NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Chennai',
  'Ahmedabad'
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
