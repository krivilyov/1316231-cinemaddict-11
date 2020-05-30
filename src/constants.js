export const BATCH_RENDER_STEP = 5;
export const AUTHORIZATION = `Basic PtIMbuRNarIaLEOuSegEtErmeNISkUDERIedI`;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
export const SHAKE_ANIMATION_TIMEOUT = 1000;

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
