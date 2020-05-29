import {getRandomItem} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";
import moment from "moment";

const createButtonMarkup = (name, isActive) => {
  return (
    `<button class="film-card__controls-item button
     film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}">
      ${name}
     </button>`
  );
};

const createFilmCartTemplate = (film) => {

  const {title, rating, releaseDate, runtime, genres, poster, description} = film;
  const commentsCount = film.commentsIds.length;

  const formattedRunTime = formatRunTime(runtime);
  const formattedGenres = getRandomItem(genres);
  const formattedReleaseDate = moment(releaseDate).format(`YYYY`);

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, film.controls.isWatchlist);
  const watchedButton = createButtonMarkup(`mark-as-watched`, film.controls.isWatched);
  const favoriteButton = createButtonMarkup(`favorite`, film.controls.isFavorite);

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${formattedReleaseDate}</span>
            <span class="film-card__duration">${formattedRunTime}</span>
            <span class="film-card__genre">${formattedGenres}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.substr(0, 137)}...</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            ${watchlistButton}
            ${watchedButton}
            ${favoriteButton}
          </form>
    </article>`
  );
};

export const formatRunTime = (runtime) => {
  const duration = moment.duration(runtime, `minutes`);
  const hours = duration.hours() ? `${duration.hours()}h` : ``;
  const minutes = `${duration.minutes()}m`;
  return `${hours} ${minutes}`;
};

export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCartTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll(`img.film-card__poster, h3.film-card__title, a.film-card__comments`)
      .forEach((elem) => {
        elem.addEventListener(`click`, handler);
      });
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
    this._setWatchListHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
    this._setWatchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
    this._setFavorite = handler;
  }
}
