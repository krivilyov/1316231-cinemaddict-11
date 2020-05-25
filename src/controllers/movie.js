import FilmCardComponent from "../components/film-card-component";
import {remove, render, replace, RenderPosition} from "../utils/render";
import FilmDetailsComponent from "../components/film-details-component";
import {generateComments} from "../mock/comments";
import Comments from "../models/comments";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onFilmClick = this._onFilmClick.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    const container = this._container;
    const containerElement = container.querySelector(`.films-list__container`);
    this._comments = new Comments();
    this._comments.setComments(generateComments());

    this._filmComponent = new FilmCardComponent(this._film, this._comments);
    this._createCardDataChangeHandlers(this._film);

    this._filmComponent.setClickHandler(this._onFilmClick);


    // this._filmDetailsComponent = new FilmDetailsComponent(film, this._comments);
    // this._filmComponent.setClickHandler(() => {
    //   this._filmDetailsComponent = new FilmDetailsComponent(film, this._comments);
    //   this._onViewChange();
    //   this._createFilmDetailsHandlers(film);
    //   render(siteFooterElement, this._filmDetailsComponent, RenderPosition.AFTERBEGIN);
    // });
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


    // console.log(oldFilmDetailsComponent);
    // if (!oldFilmComponent && !oldFilmDetailsComponent) {
    //   render(containerElement, this._filmComponent);
    // } else {
    //
    //
    //   replace(oldFilmDetailsComponent.getElement().parentNode, this._filmDetailsComponent.getElement(), oldFilmDetailsComponent.getElement());
    //   // this._createFilmDetailsHandlers(this._film);
    // }
  }

  _onFilmClick() {
    this._onViewChange();
    const siteFooterElement = document.querySelector(`.footer`);
    this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
    this._createFilmDetailsHandlers(this._film);
    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.AFTERBEGIN);
  }

  _createCardDataChangeHandlers(film) {
    const watchListButtonClickHandler = this._createButtonClickHandler(film, {
      isWatchlist: !film.isWatchlist,
    });
    const watchedButtonClickHandler = this._createButtonClickHandler(film, {
      isWatched: !film.isWatched,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorite: !film.isFavorite,
    });

    this._filmComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
  }

  _createFilmDetailsHandlers(film) {
    const watchListButtonClickHandler = this._createButtonClickHandler(film, {
      isWatchlist: !film.isWatchlist,
    });
    const watchedButtonClickHandler = this._createButtonClickHandler(film, {
      isWatched: !film.isWatched,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorite: !film.isFavorite,
    });

    this._filmDetailsComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmDetailsComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmDetailsComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
    this._filmDetailsComponent.setCloseButtonClickHandler(() => remove(this._filmDetailsComponent));

    // удаление комментария
    this._filmDetailsComponent.setRemoveCommentClickHandler(this._onCommentClick);

    // слушаем Esc
    document.addEventListener(`keydown`, (e) => {
      if (e.which === 27) {
        remove(this._filmDetailsComponent);
      }
    });
  }

  _createButtonClickHandler(film, changedData) {
    return (evt) => {
      evt.preventDefault();

      this._onDataChange(this, film.id, Object.assign({}, film, changedData));
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
  }
}
