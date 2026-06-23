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
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Zendaya', role: 'Chani', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Javier Bardem', role: 'Stilgar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Emily Blunt', role: 'Kitty Oppenheimer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Matt Damon', role: 'Leslie Groves', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    director: 'Joaquim Dos Santos',
    cast: [
      { name: 'Shameik Moore', role: 'Miles Morales', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Hailee Steinfeld', role: 'Gwen Stacy', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Oscar Isaac', role: 'Miguel O\'Hara', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Jake Johnson', role: 'Peter B. Parker', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Anne Hathaway', role: 'Brand', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Jessica Chastain', role: 'Murph', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Michael Caine', role: 'Professor Brand', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne / Batman', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Heath Ledger', role: 'Joker', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Maggie Gyllenhaal', role: 'Rachel Dawes', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race.',
    director: 'James Cameron',
    cast: [
      { name: 'Sam Worthington', role: 'Jake Sully', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Zoe Saldana', role: 'Neytiri', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Sigourney Weaver', role: 'Kiri', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Kate Winslet', role: 'Ronal', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
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
    description: 'The highly anticipated sequel to Matt Reeves\' gritty detective take on the Caped Crusader.',
    director: 'Matt Reeves',
    cast: [
      { name: 'Robert Pattinson', role: 'Bruce Wayne / Batman', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Zoë Kravitz', role: 'Selina Kyle / Catwoman', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Jeffrey Wright', role: 'James Gordon', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Andy Serkis', role: 'Alfred Pennyworth', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
  },
  {
    id: 'cs2',
    title: 'Gladiator II',
    genre: 'Action / Drama / History',
    language: 'English',
    releaseDate: 'November 22, 2024',
    poster: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo',
    description: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.',
    director: 'Ridley Scott',
    cast: [
      { name: 'Paul Mescal', role: 'Lucius Verus', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Pedro Pascal', role: 'Marcus Acacius', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Denzel Washington', role: 'Macrinus', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Connie Nielsen', role: 'Lucilla', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
  },
  {
    id: 'cs3',
    title: 'Mufasa: The Lion King',
    genre: 'Adventure / Drama / Family',
    language: 'English, Hindi, Tamil, Telugu',
    releaseDate: 'December 20, 2024',
    poster: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/o17MF9v_Jg0',
    description: 'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal lineage.',
    director: 'Barry Jenkins',
    cast: [
      { name: 'Aaron Pierre', role: 'Mufasa', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Kelvin Harrison Jr.', role: 'Taka / Scar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Tiffany Boone', role: 'Sarabi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Donald Glover', role: 'Simba', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
  },
  {
    id: 'cs4',
    title: 'Superman: Legacy',
    genre: 'Action / Sci-Fi / Adventure',
    language: 'English, Hindi',
    releaseDate: 'July 11, 2025',
    poster: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    description: 'The story of Superman\'s journey to reconcile his Kryptonian heritage with his human upbringing.',
    director: 'James Gunn',
    cast: [
      { name: 'David Corenswet', role: 'Clark Kent / Superman', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Rachel Brosnahan', role: 'Lois Lane', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Nicholas Hoult', role: 'Lex Luthor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { name: 'Isabela Merced', role: 'Hawkgirl', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
  }
];

