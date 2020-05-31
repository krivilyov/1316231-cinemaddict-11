import {FILTER_TYPES} from "../constants";

const getToWatchlist = (films) => films.filter((film) => Boolean(film.controls.isWatchlist));
const getAsWatched = (films) => films.filter((film) => Boolean(film.controls.isWatched));
const getAsFavorite = (films) => films.filter((film) => Boolean(film.controls.isFavorite));

const getFilteredFilms = (activeFilter, films) => {
  let filteredFilms;
  switch (activeFilter) {
    case FILTER_TYPES.ALL:
      filteredFilms = films;
      break;
    case FILTER_TYPES.WATCHLIST:
      filteredFilms = getToWatchlist(films);
      break;
    case FILTER_TYPES.HISTORY:
      filteredFilms = getAsWatched(films);
      break;
    case FILTER_TYPES.FAVORITES:
      filteredFilms = getAsFavorite(films);
      break;
  }

  return filteredFilms;
};


export {getFilteredFilms, FILTER_TYPES};
