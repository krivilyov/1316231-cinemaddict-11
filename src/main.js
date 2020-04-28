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

import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils.js";

const renderFilm = (siteAllFilmsListContainerElement, film) => {
  const filmComponent = new FilmComponent(film);
  const filmCardElement = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmCommentsElement = filmComponent.getElement().querySelector(`.film-card__comments`);

  filmCardElement.addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  filmTitleElement.addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  filmCommentsElement.addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  render(siteAllFilmsListContainerElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmDetails = (film) => {
  const siteFooterElement = document.querySelector(`.footer`);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const filmDetailsCloseBtnElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  filmDetailsCloseBtnElement.addEventListener(`click`, () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
  });

  // слушаем Esc
  document.addEventListener(`keydown`, (e) => {
    if (e.which === 27) {
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
    }
  });

  render(siteFooterElement, filmDetailsComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const renderBoard = (siteFilmsWrapElement, films) => {
  render(siteFilmsWrapElement, new AllFilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const siteAllFilmsListWrapElement = document.querySelector(`.films-list`);
  const siteAllFilmsListContainerElement = siteAllFilmsListWrapElement.querySelector(`.films-list__container`);

  films
    .slice(0, SHOWING_FILMS_COUNT_ON_START)
    .forEach((film) => {
      renderFilm(siteAllFilmsListContainerElement, film);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(siteAllFilmsListWrapElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    let showingFilmsCount = siteAllFilmsListContainerElement.querySelectorAll(`.film-card`).length;
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => {
        renderFilm(siteAllFilmsListContainerElement, film);
      });

    if (showingFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
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
