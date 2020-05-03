import FilmComponent from "../components/film-component";
import {remove, render, RenderPosition} from "../utils/render";
import FilmDetailsComponent from "../components/film-details-component";
import FilmsListComponent from "../components/films-list-component";
import NoFilmsComponent from "../components/no-films-component";
import {BATCH_RENDER_STEP} from "../constants";
import LoadMoreButtonComponent from "../components/load-more-button-component";
import SortMenuComponent, {SortType} from "../components/sort-menu-component";

const renderFilm = (filmsListContainer, film) => {
  const filmComponent = new FilmComponent(film);

  filmComponent.setClickHandler(() => renderFilmDetails(film));

  render(filmsListContainer, filmComponent);
};

const renderFilmDetails = (film) => {
  const siteFooterElement = document.querySelector(`.footer`);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmDetailsComponent.setCloseButtonClickHandler(() => remove(filmDetailsComponent));

  // слушаем Esc
  document.addEventListener(`keydown`, (e) => {
    if (e.which === 27) {
      remove(filmDetailsComponent);
    }
  });

  render(siteFooterElement, filmDetailsComponent, RenderPosition.AFTERBEGIN);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._renderedFilms = 0;
    this._sortMenuComponent = new SortMenuComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();
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

    const containerElement = filmsElement.querySelector(`.films-list__container`);

    const from = this._renderedFilms;
    const to = from + BATCH_RENDER_STEP;

    films
      .slice(from, to)
      .forEach((film) => {
        renderFilm(containerElement, film);
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
}
