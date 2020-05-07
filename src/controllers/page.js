import {remove, render, RenderPosition} from "../utils/render";
import FilmsListComponent from "../components/films-list-component";
import NoFilmsComponent from "../components/no-films-component";
import {BATCH_RENDER_STEP} from "../constants";
import LoadMoreButtonComponent from "../components/load-more-button-component";
import SortMenuComponent, {SortType} from "../components/sort-menu-component";
import MovieController from "./movie";

export default class PageController {
  constructor(container) {
    this._container = container;
    this._renderedFilms = 0;
    this._films = [];
    this._sortMenuComponent = new SortMenuComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(films) {
    const container = this._container.getElement();
    this._films = films;
    render(container, this._sortMenuComponent, RenderPosition.BEFOREBEGIN);

    if (films.length === 0) {
      render(container, this._noFilmsComponent);
      return;
    }

    const filmsComponent = new FilmsListComponent();
    render(container, filmsComponent);

    const filmsElement = filmsComponent.getElement();
    this._renderFilms(filmsElement, films);

    this._sortMenuComponent.setSortingCallback((sortType) => {
      const sortedFilms = this._getSortedFilms(films, sortType);
      this._clearRenderedFilms(container);
      this._renderFilms(filmsElement, sortedFilms);
    });

  }

  _renderFilms(filmsElement, films) {
    this._renderBatchFilms(filmsElement, films);
    if (films.length > BATCH_RENDER_STEP) {
      this._renderMoreButton(filmsElement, films);
    }
  }

  _renderBatchFilms(filmsElement, films) {
    if (!this._shouldFilmsBeRendered(films)) {
      return;
    }

    const from = this._renderedFilms;
    const to = from + BATCH_RENDER_STEP;

    films
      .slice(from, to)
      .forEach((film) => {
        const movieController = new MovieController(filmsElement, this._onDataChange);
        movieController.render(film);
      });

    this._renderedFilms = Math.min(to, films.length);
  }

  _shouldFilmsBeRendered(films) {
    return this._renderedFilms < films.length;
  }

  _renderMoreButton(container, films) {
    render(container, this._loadMoreButtonComponent);
    const buttonClickHandler = () => {
      this._renderBatchFilms(container, films);

      if (!this._shouldFilmsBeRendered(films)) {
        this._loadMoreButtonComponent.removeClickHandler(buttonClickHandler);
        remove(this._loadMoreButtonComponent);
      }
    };

    this._loadMoreButtonComponent.setClickHandler(buttonClickHandler);
  }

  _getSortedFilms(films, sortType) {
    let sortedFilms = [];
    const renderedFilms = films.slice();

    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = renderedFilms;
        break;
      case SortType.DATE:
        sortedFilms = renderedFilms.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = renderedFilms.sort((a, b) => b.rating - a.rating);
        break;
    }

    return sortedFilms.slice();
  }

  _clearRenderedFilms(container) {
    const filmsContainer = container.querySelector(`.films-list__container`);
    filmsContainer.innerHTML = ``;
    this._renderedFilms = 0;
    remove(this._loadMoreButtonComponent);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }
}
