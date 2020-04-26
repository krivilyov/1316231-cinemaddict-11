import {FILMS_COUNT, EXTRA_FILMS_SECTION_COUNT, EXTRA_FILMS_COUNT, SHOWING_FILMS_COUNT_ON_START, SHOWING_FILMS_COUNT_BY_BUTTON} from "./constants";

import {createUserProfileTemplate} from "./components/user-profile.js";
import {createMenuTemplate} from "./components/navigation-menu.js";
import {createSortMenuTemplate} from "./components/sort-menu.js";
import {createFilmsMainWrapTemplate} from "./components/films-main-wrap.js";
import {createAllFilmsWrapTemplate} from "./components/all-films-wrap.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createFilmTemplate} from "./components/film.js";
import {createExtraFilmsWrapTemplate} from "./components/extra-films-wrap.js";
import {createStatisticCounterTemplate} from "./components/statistic-counter.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilms} from "./mock/film.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const userProfile = generateUserProfile();
render(siteHeaderElement, createUserProfileTemplate(userProfile));

const siteMainElement = document.querySelector(`.main`);
const filters = generateFilters();
render(siteMainElement, createMenuTemplate(filters));
render(siteMainElement, createSortMenuTemplate());
render(siteMainElement, createFilmsMainWrapTemplate());

const siteFilmsWrapElement = document.querySelector(`.films`);
render(siteFilmsWrapElement, createAllFilmsWrapTemplate());

const siteAllFilmsListWrapElement = document.querySelector(`.films-list`);
render(siteAllFilmsListWrapElement, createLoadMoreButtonTemplate());

const films = generateFilms(FILMS_COUNT);
const siteAllFilmsListContainerElement = siteAllFilmsListWrapElement.querySelector(`.films-list__container`);

const renderFilms = (start, end) => {
  films
    .slice(start, end)
    .forEach((film) => {
      render(siteAllFilmsListContainerElement, createFilmTemplate(film));
    });
};

renderFilms(0, SHOWING_FILMS_COUNT_ON_START);

for (let i = 0; i < EXTRA_FILMS_SECTION_COUNT; i++) {
  render(siteFilmsWrapElement, createExtraFilmsWrapTemplate());
}

const siteExtraFilmsListWrapElements = document.querySelectorAll(`.films-list--extra`);
if (siteExtraFilmsListWrapElements.length) {
  for (let i = 0; i < siteExtraFilmsListWrapElements.length; i++) {

    for (let j = 0; j < EXTRA_FILMS_COUNT; j++) {
      const siteExtraFilmsWrapElement = siteExtraFilmsListWrapElements[i].querySelector(`.films-list__container`);
      render(siteExtraFilmsWrapElement, createFilmTemplate(films[j]));
    }

  }
}

const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatisticElement, createStatisticCounterTemplate());

// открытие попапа детального описания кино
openPopapFilmDetail();

const loadMoreButton = siteAllFilmsListWrapElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  let showingFilmsCount = siteAllFilmsListContainerElement.querySelectorAll(`.film-card`).length;
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  renderFilms(prevFilmsCount, showingFilmsCount);

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }

  // переинициализируем открытие попапа
  openPopapFilmDetail();
});

function openPopapFilmDetail() {
  const siteFilmElements = document.querySelectorAll(`.film-card`);
  const siteFooterElement = document.querySelector(`.footer`);
  siteFilmElements.forEach((element, i) => {
    element.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
      render(siteFooterElement, createFilmDetailsTemplate(films[i]), `afterend`);
      // инициализируем кнопку выключения попапа
      closePopapFilmDetails();
    });

    element.querySelector(`.film-card__title`).addEventListener(`click`, () => {
      render(siteFooterElement, createFilmDetailsTemplate(films[i]), `afterend`);
      // инициализируем кнопку выключения попапа
      closePopapFilmDetails();
    });

    element.querySelector(`.film-card__comments`).addEventListener(`click`, () => {
      render(siteFooterElement, createFilmDetailsTemplate(films[i]), `afterend`);
      // инициализируем кнопку выключения попапа
      closePopapFilmDetails();
    });
  });
}

function closePopapFilmDetails() {
  const filmDetailsElement = document.querySelector(`.film-details`);
  const filmDetailsCloseBtnElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

  filmDetailsCloseBtnElement.addEventListener(`click`, () => {
    filmDetailsElement.remove();
  });

  // слушаем Esc
  document.addEventListener(`keydown`, (e) => {
    if (e.which === 27) {
      filmDetailsElement.remove();
    }
  });
}
