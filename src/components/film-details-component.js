import {MONTHS} from "../constants.js";
import CommentsComponent from "./comments-component.js";
import {formatDescription, formatRunTime} from "./film-card-component.js";
import AbstractComponent from "./abstract-component.js";

const createFilmDetailsTemplate = (film) => {
  const {fullImage, name, originalName, rating, director, writers, actors, releaseDate, runtime, country, genres, description, ratingAge, comments} = film;

  const commentsTemplate = new CommentsComponent(comments).getTemplate();
  const formattedRunTime = formatRunTime(runtime);
  const genreBlock = genres
    .map((genre) => createGenresBlock(genre))
    .join(``);

  const formattedReleaseDate = formatReleaseDate(releaseDate);
  const formattedDescription = formatDescription(description);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${fullImage}" alt="${name}">

              <p class="film-details__age">${ratingAge}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formattedReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedRunTime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genreBlock}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${formattedDescription}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            ${commentsTemplate}
          </section>
        </div>
      </form>
    </section>`
  );
};

const createGenresBlock = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const formatReleaseDate = (releaseDate) => {
  return `${(`0` + releaseDate.getDate()).slice(-2)} ${MONTHS[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;
};


export default class FilmDetailsComponent extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    const filmDetailsCloseBtnElement = this.getElement().querySelector(`.film-details__close-btn`);
    filmDetailsCloseBtnElement.addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._setWatchListHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._setWatchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._setFavorite = handler;
  }
}
