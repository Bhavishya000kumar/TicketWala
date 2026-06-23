// CineVerse Movies Database
// This data layer mirrors the fields required for production databases.

export const NOW_SHOWING_MOVIES = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Adventure / Action',
    language: 'English, Hindi, Tamil',
    duration: '2h 46m',
    rating: '9.3',
    releaseDate: 'March 1, 2024',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
  },
  {
    id: 'm2',
    title: 'Oppenheimer',
    genre: 'Biography / Drama / History',
    language: 'English, Hindi',
    duration: '3h 00m',
    rating: '9.5',
    releaseDate: 'July 21, 2023',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
  },
  {
    id: 'm3',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animation / Action / Adventure',
    language: 'English, Hindi, Tamil, Telugu',
    duration: '2h 20m',
    rating: '9.1',
    releaseDate: 'June 2, 2023',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.'
  },
  {
    id: 'm4',
    title: 'Interstellar',
    genre: 'Sci-Fi / Drama / Adventure',
    language: 'English',
    duration: '2h 49m',
    rating: '9.6',
    releaseDate: 'November 7, 2014',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZATo3Es',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 'm5',
    title: 'The Dark Knight',
    genre: 'Action / Crime / Drama',
    language: 'English, Hindi',
    duration: '2h 32m',
    rating: '9.7',
    releaseDate: 'July 18, 2008',
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
    id: 'm6',
    title: 'Avatar: The Way of Water',
    genre: 'Action / Sci-Fi / Adventure',
    language: 'English, Hindi, Telugu',
    duration: '3h 12m',
    rating: '8.9',
    releaseDate: 'December 16, 2022',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race.'
  }
];

export const COMING_SOON_MOVIES = [
  {
    id: 'cs1',
    title: 'The Batman: Part II',
    genre: 'Action / Crime / Mystery',
    language: 'English, Hindi',
    releaseDate: 'October 2, 2026',
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    description: 'The highly anticipated sequel to Matt Reeves\' gritty detective take on the Caped Crusader.'
  },
  {
    id: 'cs2',
    title: 'Gladiator II',
    genre: 'Action / Drama / History',
    language: 'English',
    releaseDate: 'November 22, 2024',
    poster: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo',
    description: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.'
  },
  {
    id: 'cs3',
    title: 'Mufasa: The Lion King',
    genre: 'Adventure / Drama / Family',
    language: 'English, Hindi, Tamil, Telugu',
    releaseDate: 'December 20, 2024',
    poster: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/o17MF9v_Jg0',
    description: 'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal lineage.'
  },
  {
    id: 'cs4',
    title: 'Superman: Legacy',
    genre: 'Action / Sci-Fi / Adventure',
    language: 'English, Hindi',
    releaseDate: 'July 11, 2025',
    poster: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    description: 'The story of Superman\'s journey to reconcile his Kryptonian heritage with his human upbringing.'
  }
];
