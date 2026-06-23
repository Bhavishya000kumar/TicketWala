// Centralized Theatre Database for CineVerse
// Includes key parameters like name, location, screening type, and facilities.

export const THEATRES = [
  {
    id: 't1',
    name: 'PVR: Elante Mall',
    location: 'Industrial Area Phase I, Chandigarh',
    type: 'IMAX',
    facilities: ['IMAX', 'Dolby Atmos', 'Recliner Seats', 'Food Court', 'Parking']
  },
  {
    id: 't2',
    name: 'INOX: City Center',
    location: 'City Center Mall, Sector 5, Panchkula',
    type: 'Dolby Atmos',
    facilities: ['Dolby Atmos', '3D Screenings', 'Snack Bar', 'Parking']
  },
  {
    id: 't3',
    name: 'Cinepolis: Downtown',
    location: 'Downtown Square, Zirakpur',
    type: '4DX',
    facilities: ['4DX', 'Motion Seats', 'Environmental Effects', 'Food Court', 'Parking']
  },
  {
    id: 't4',
    name: 'Luxe Premium Cinema',
    location: 'Nexus Mall, Sector 17, Chandigarh',
    type: 'Luxe',
    facilities: ['Luxe Recliners', 'VIP Lounge', 'In-Seat Dining', 'Valet Parking']
  }
];

export default THEATRES;
