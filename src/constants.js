export const BATCH_RENDER_STEP = 5;
export const AUTHORIZATION = `Basic PtIMbuRNarIaLEOuSegEtErmeNISkUDERIedI`;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

export const Rank = {
  NOVICE: {
    name: `Novice`,
    value: 1,
  },
  FAN: {
    name: `Fan`,
    value: 11,
  },
  MOVIE_BUFF: {
    name: `Movie Buff`,
    value: 21,
  },
};

export const FILTER_NAMES = [
  {id: `all`, name: `All movies`},
  {id: `watchlist`, name: `Watchlist`},
  {id: `history`, name: `History`},
  {id: `favorites`, name: `Favorites`},
];

export const PREVIEW_IMAGES = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

export const FILM_NAMES = [
  `Made for each other`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The man with The golden arm`,
];

export const DIRECTORS = [
  `Anthony Mann`,
  `Mar Uolberg`,
  `Dim Matchel`,
  `Ron Mute`,
  `Lory Metabra`,
];

export const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
];

export const ACTORS = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
];

export const COUNTRIES = [
  `USA`,
  `Canada`,
  `Bolivia`,
  `Denmark`,
  `Guinea`,
  `India`,
  `Libya`,
];

export const genres = [
  `Action`,
  `Adventure`,
  `Animation`,
  `Comedy`,
  `Drama`,
  `Family`,
  `Horror`,
  `Sci-Fi`,
  `Thriller`,
];

export const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

export const COMMENTATOR_NAMES = [
  `Sylvester Stallone`,
  `Chuck Norris`,
  `Jean-Claude Van Damme`,
  `Arnold Schwarzenegger`,
  `Jackie Chan`,
  `Kurt Russell`,
];

export const COMMENTS_CONTENT = [
  `It's cool!`,
  `It's funny!`,
  `I like it!`,
  `I love this film!`,
  `Boring!`,
  `Bad film!`,
];

export const DESCRIPTIONS_CONTENT = [
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const TimeFilter = {
  ALLTIME: {
    name: `All time`,
    label: `all-time`,
  },
  TODAY: {
    name: `Today`,
    label: `today`,
  },
  WEEK: {
    name: `Week`,
    label: `week`,
  },
  MONTH: {
    name: `Month`,
    label: `month`,
  },
  YEAR: {
    name: `Year`,
    label: `year`,
  },
};

export const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

export const ErrorMessage = {
  CONNECTION: `No internet connection`,
  CONSTRUCTOR: `Can't instantiate AbstractComponent, only concrete one.`,
  getNotImplemented: (method) => `Abstract method is not implemented: ${method}`,
  SYNCHRONIZATION: `Sync data failed`,
};

export const FilterTypes = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};
