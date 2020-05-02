import FilmComponent from "../components/film";
import {remove, render, RenderPosition} from "../utils/render";
import FilmDetailsComponent from "../components/film-details";
import AllFilmsContainerComponent from "../components/all-films-container";
import NoFilmsComponent from "../components/no-films";
import {SHOWING_FILMS_COUNT_BY_BUTTON, SHOWING_FILMS_COUNT_ON_START} from "../constants";
import LoadMoreButtonComponent from "../components/load-more-button";
import FilmsListContainer from "../components/films-list-container.js";

const renderFilm = (filmsListContainer, film) => {
  const filmComponent = new FilmComponent(film);

  filmComponent.setClickHandler(() => renderFilmDetails(film));

  render(filmsListContainer, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilmDetails = (film) => {
  const siteFooterElement = document.querySelector(`.footer`);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const filmDetailsCloseBtnElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  filmDetailsComponent.setClickHandler(filmDetailsCloseBtnElement, () => remove(filmDetailsComponent));
  // слушаем Esc
  filmDetailsComponent.setEventHandler(document, (e) => {
    if (e.which === 27) {
      remove(filmDetailsComponent);
    }
  });

  render(siteFooterElement, filmDetailsComponent, RenderPosition.AFTERBEGIN);
};

export default class FilmController {
  constructor(container) {
    this._container = container;
    this._allFilmsContainerComponent = new AllFilmsContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListContainer = new FilmsListContainer();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    // если фильмов нет выводим сообщение
    if (films.length === 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._allFilmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._allFilmsContainerComponent.getElement(), this._filmsListContainer, RenderPosition.BEFOREEND);

    const renderFilms = (allFilms, startCount, stopCount) => {
      allFilms
        .slice(startCount, stopCount)
        .forEach((film) => {
          renderFilm(this._filmsListContainer.getElement(), film);
        });
    };

    renderFilms(films, 0, SHOWING_FILMS_COUNT_ON_START);

    render(this._allFilmsContainerComponent.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      let showingFilmsCount = this._filmsListContainer.getElement().querySelectorAll(`.film-card`).length;
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
      renderFilms(films, prevFilmsCount, showingFilmsCount);
      if (showingFilmsCount >= films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
