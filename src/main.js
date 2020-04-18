const FILMS_COUNT = 5;
const EXTRA_FILMS_SECTION_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

import {createUserProfileTemplate} from "./components/user-profile.js";
import {createNavigationMenuTemplate} from "./components/navigation-menu.js";
import {createSortMenuTemplate} from "./components/sort-menu.js";
import {createFilmsMainWrapTemplate} from "./components/films-main-wrap.js";
import {createAllFilmsWrapTemplate} from "./components/all-films-wrap.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createFilmTemplate} from "./components/film.js";
import {createExtraFilmsWrapTemplate} from "./components/extra-films-wrap.js";
import {createStatisticCounterTemplate} from "./components/statistic-counter.js";
import {createFilmDetailTemplate} from "./components/film-detail.js";
import {generateUserProfile} from "./mock/user-profile.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const userProfile = generateUserProfile();
render(siteHeaderElement, createUserProfileTemplate(userProfile));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createNavigationMenuTemplate());
render(siteMainElement, createSortMenuTemplate());
render(siteMainElement, createFilmsMainWrapTemplate());

const siteFilmsWrapElement = document.querySelector(`.films`);
render(siteFilmsWrapElement, createAllFilmsWrapTemplate());

const siteAllFilmsListWrapElement = document.querySelector(`.films-list`);
render(siteAllFilmsListWrapElement, createLoadMoreButtonTemplate());

const siteAllFilmsListContainerElement = siteAllFilmsListWrapElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteAllFilmsListContainerElement, createFilmTemplate());
}

for (let i = 0; i < EXTRA_FILMS_SECTION_COUNT; i++) {
  render(siteFilmsWrapElement, createExtraFilmsWrapTemplate());
}

const siteExtraFilmsListWrapElements = document.querySelectorAll(`.films-list--extra`);
if (siteExtraFilmsListWrapElements.length) {
  for (let i = 0; i < siteExtraFilmsListWrapElements.length; i++) {

    for (let j = 0; j < EXTRA_FILMS_COUNT; j++) {
      const siteExtraFilmsWrapElement = siteExtraFilmsListWrapElements[i].querySelector(`.films-list__container`);
      render(siteExtraFilmsWrapElement, createFilmTemplate());
    }

  }
}

const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatisticElement, createStatisticCounterTemplate());

const siteActiveFilmDetailElements = document.querySelectorAll(`.film-card__poster`);
const siteFooterElement = document.querySelector(`.footer`);
if (siteActiveFilmDetailElements.length) {
  siteActiveFilmDetailElements.forEach((img) => {
    img.addEventListener(`click`, () => render(siteFooterElement, createFilmDetailTemplate(), `afterend`));
  });
}
