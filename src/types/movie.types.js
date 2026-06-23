// CineVerse Movie JSDoc Types Definition
// Prepares documentation structures for MongoDB Schema mappings.

/**
 * @typedef {Object} CastMember
 * @property {string} name - Name of actor
 * @property {string} character - Name of character played
 * @property {string} avatarUrl - URL to portrait photo
 */

/**
 * @typedef {Object} Review
 * @property {string} id - Unique review identification ID
 * @property {string} userName - Author name
 * @property {number} rating - Score out of 10
 * @property {string} comment - Text review commentary
 * @property {string} date - ISO Date string
 */

/**
 * @typedef {Object} Movie
 * @property {string} id - MongoDB unique ID reference
 * @property {string} title - Title of the movie
 * @property {string} genre - Category groupings (e.g. Action / Adventure)
 * @property {string} language - Play languages (English, Hindi, etc.)
 * @property {string} duration - Length of film (e.g. 2h 45m)
 * @property {string} rating - Live user rating average
 * @property {string} releaseDate - Local release window details
 * @property {string} poster - Cloudinary URL for poster portrait
 * @property {string} banner - Cloudinary URL for backdrop landscape
 * @property {string} trailerUrl - Embedded player trigger reference
 * @property {string} description - Synopsis text summary
 * @property {CastMember[]} [cast] - Array of cast members
 * @property {Review[]} [reviews] - User reviews collection
 */

export default {};
