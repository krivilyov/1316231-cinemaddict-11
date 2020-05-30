import FilmCardComponent from "../components/film-card-component";
import {remove, render, replace, RenderPosition} from "../utils/render";
import FilmDetailsComponent from "../components/film-details-component";
import Comments from "../models/comments";
import {ErrorMessage, SHAKE_ANIMATION_TIMEOUT} from "../constants";
import Movie from "../models/movie.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onFilmClick = this._onFilmClick.bind(this);
    this._onCommentClick = this._onCommentClick.bind(this);
    this._comments = null;
    this._isCommentsChanged = false;
    this._api = api;
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    const container = this._container;
    const containerElement = container.querySelector(`.films-list__container`);

    this._filmComponent = new FilmCardComponent(this._film, this._comments);
    this._createCardDataChangeHandlers(this._film);

    this._filmComponent.setClickHandler(this._onFilmClick);

    if (!oldFilmComponent) {
      render(containerElement, this._filmComponent);
    } else {
      replace(oldFilmComponent.getElement().parentNode, this._filmComponent.getElement(), oldFilmComponent.getElement());

      if (oldFilmDetailsComponent) {
        this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
        replace(oldFilmDetailsComponent.getElement().parentNode, this._filmDetailsComponent.getElement(), oldFilmDetailsComponent.getElement());
        this._createFilmDetailsHandlers(this._film);
      }
    }
  }

  _onFilmClick() {
    this._onViewChange();

    this._api.getComments(this._film.id).then((comments) => {
      this._comments = new Comments();
      this._comments.setComments(comments);
      const siteFooterElement = document.querySelector(`.footer`);
      this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
      this._createFilmDetailsHandlers(this._film);
      render(siteFooterElement, this._filmDetailsComponent, RenderPosition.AFTERBEGIN);
    })
      .catch(() => {
        return Promise.reject(new Error(ErrorMessage.CONNECTION));
      });
  }

  _createCardDataChangeHandlers() {
    const watchListButtonClickHandler = this._createButtonClickHandler(`isWatchlist`);
    const watchedButtonClickHandler = this._createButtonClickHandler(`isWatched`);
    const favoriteButtonClickHandler = this._createButtonClickHandler(`isFavorite`);

    this._filmComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
  }

  _createFilmDetailsHandlers() {
    const watchListButtonClickHandler = this._createButtonClickHandler(`isWatchlist`);
    const watchedButtonClickHandler = this._createButtonClickHandler(`isWatched`);
    const favoriteButtonClickHandler = this._createButtonClickHandler(`isFavorite`);

    this._filmDetailsComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmDetailsComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmDetailsComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
    this._filmDetailsComponent.setCloseButtonClickHandler(() => remove(this._filmDetailsComponent));

    // удаление комментария
    this._filmDetailsComponent.setRemoveCommentClickHandler(this._onCommentClick);
    this._filmDetailsComponent.setNewCommentSubmitHandler((newComment) => {
      this._filmDetailsComponent.disable();

      this._onCommentChange(null, newComment);
    });

    // слушаем Esc
    document.addEventListener(`keydown`, (e) => {
      if (e.which === 27) {
        remove(this._filmDetailsComponent);
      }
    });
  }

  _createButtonClickHandler(changedData) {
    return (evt) => {
      evt.preventDefault();

      const newFilm = Movie.clone(this._film);
      newFilm.controls[changedData] = !newFilm.controls[changedData];

      this._onDataChange(this, this._film, newFilm);
    };
  }

  _setDefaultView() {
    this._closeFilmDetailsPopup();
  }

  _closeFilmDetailsPopup() {
    if (this._filmDetailsComponent) {
      this._filmDetailsComponent.getElement().remove();
    }
  }

  _onCommentClick(commentId) {
    this._filmDetailsComponent.setDeletingButton(commentId);
    this._filmDetailsComponent.disableCommentButton(commentId);

    this._onCommentChange(commentId, null);
  }

  _onCommentChange(oldCommentId, newComment) {
    this._isCommentsChanged = true;

    if (newComment === null) {

      this._api.removeComment(oldCommentId)
        .then(() => {
          this._comments.setRemoveComment(oldCommentId);
          const newFilm = Movie.clone(this._film);
          this._onDataChange(this, this._film, newFilm);
        })
        .catch(() => {
          const commentsElements = this._filmDetailsComponent.getElement().querySelectorAll(`.film-details__comment`);
          const commentElement = Array.from(commentsElements).find((element) => element.dataset.id === oldCommentId);

          this._filmDetailsComponent.enableCommentButton(oldCommentId);
          this._filmDetailsComponent.shakeComment(commentElement);

          setTimeout(() => {
            this._filmDetailsComponent.setDeletingButton(null);
          }, SHAKE_ANIMATION_TIMEOUT);
        });

    } else if (oldCommentId === null) {

      this._api.addComment(this._film.id, newComment)
        .then((comment) => {
          this._filmDetailsComponent.enable();
          this._comments.addComment(comment);
          const newFilm = Movie.clone(this._film);
          this._onDataChange(this, this._film, newFilm);
        })
        .catch(() => {
          this._filmDetailsComponent.enable();
          this._filmDetailsComponent.shake();
        });
    }
  }
}
