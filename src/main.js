import {FILMS_COUNT, SHOWING_FILMS_COUNT_ON_START, SHOWING_FILMS_COUNT_BY_BUTTON} from "./constants";
import UserProfileComponent from "./components/user-profile.js";
import MenuComponent from "./components/navigation-menu.js";
import SortMenuComponent from "./components/sort-menu.js";
import FilmsMainContainerComponent from "./components/films-main-container.js";
import AllFilmsContainerComponent from "./components/all-films-container.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import FilmComponent from "./components/film.js";
import StatisticCounterComponent from "./components/statistic-counter.js";
import FilmDetailsComponent from "./components/film-details.js";
import NoFilmsComponent from "./components/no-films.js";

import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils.js";
import {removeElement} from "./utils.js";

const renderFilm = (siteAllFilmsListContainerElement, film) => {
  const filmComponent = new FilmComponent(film);

  filmComponent.getElement().querySelectorAll(`img.film-card__poster, h3.film-card__title, a.film-card__comments`)
    .forEach((elem) => {
      elem.addEventListener(`click`, () => {
        renderFilmDetails(film);
      });
    });

  render(siteAllFilmsListContainerElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmDetails = (film) => {
  const siteFooterElement = document.querySelector(`.footer`);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const filmDetailsCloseBtnElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  filmDetailsCloseBtnElement.addEventListener(`click`, () => {
    removeElement(filmDetailsComponent);
  });

  // слушаем Esc
  document.addEventListener(`keydown`, (e) => {
    if (e.which === 27) {
      removeElement(filmDetailsComponent);
    }
  });

  render(siteFooterElement, filmDetailsComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const renderBoard = (siteFilmsWrapElement, films) => {
  render(siteFilmsWrapElement, new AllFilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const siteAllFilmsListWrapElement = document.querySelector(`.films-list`);

  // если фильмов нет выводим сообщение
  if (films.length === 0) {
    render(siteAllFilmsListWrapElement, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const renderFilms = (allFilms, startCount, stopCount) => {
    films
      .slice(startCount, stopCount)
      .forEach((film) => {
        renderFilm(siteAllFilmsListContainerElement, film);
      });
  };

  const siteAllFilmsListContainerElement = siteAllFilmsListWrapElement.querySelector(`.films-list__container`);

  renderFilms(films, 0, SHOWING_FILMS_COUNT_ON_START);

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(siteAllFilmsListWrapElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    let showingFilmsCount = siteAllFilmsListContainerElement.querySelectorAll(`.film-card`).length;
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    renderFilms(films, prevFilmsCount, showingFilmsCount);

    if (showingFilmsCount >= films.length) {
      removeElement(loadMoreButtonComponent);
    }
  });
};

const siteHeaderElement = document.querySelector(`.header`);
const userProfile = generateUserProfile();
render(siteHeaderElement, new UserProfileComponent(userProfile).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const filters = generateFilters();
render(siteMainElement, new MenuComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsMainContainerComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsWrapElement = document.querySelector(`.films`);
const films = generateFilms(FILMS_COUNT);

renderBoard(siteFilmsWrapElement, films);

const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatisticElement, new StatisticCounterComponent().getElement(), RenderPosition.BEFOREEND);
