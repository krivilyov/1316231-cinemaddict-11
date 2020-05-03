import {getRandomItem} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createFilmTemplate = (film) => {
  const {previewImage, name, rating, releaseDate, runtime, genres, description, comments} = film;

  const formattedRunTime = formatRunTime(runtime);
  const formattedGenres = getRandomItem(genres);
  const formattedReleaseDate = formatReleaseDate(releaseDate);
  const formattedDescription = formatDescription(description);

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${formattedReleaseDate}</span>
            <span class="film-card__duration">${formattedRunTime}</span>
            <span class="film-card__genre">${formattedGenres}</span>
          </p>
          <img src="${previewImage}" alt="" class="film-card__poster">
          <p class="film-card__description">${formattedDescription.substr(0, 137)}...</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
    </article>`
  );
};

export const formatRunTime = (runtime) => {
  return `${runtime.hour}h ${runtime.minutes}m`;
};

const formatReleaseDate = (releaseDate) => {
  return `${releaseDate.getFullYear()}`;
};

export const formatDescription = (description) => {
  return description.join(` `);
};

export default class FilmComponent extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll(`img.film-card__poster, h3.film-card__title, a.film-card__comments`)
      .forEach((elem) => {
        elem.addEventListener(`click`, handler);
      });
  }
}
