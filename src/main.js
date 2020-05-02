import {FILMS_COUNT} from "./constants";
import UserProfileComponent from "./components/user-profile.js";
import MenuComponent from "./components/navigation-menu.js";
import SortMenuComponent from "./components/sort-menu.js";
import FilmsMainContainerComponent from "./components/films-main-container.js";
import StatisticCounterComponent from "./components/statistic-counter.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmController from "./controllers/film.js";

const siteHeaderElement = document.querySelector(`.header`);
const userProfile = generateUserProfile();
render(siteHeaderElement, new UserProfileComponent(userProfile), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const filters = generateFilters();
render(siteMainElement, new MenuComponent(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuComponent(), RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_COUNT);


const filmsMainContainer = new FilmsMainContainerComponent();
render(siteMainElement, filmsMainContainer, RenderPosition.BEFOREEND);


const filmController = new FilmController(filmsMainContainer);
filmController.render(films);

const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatisticElement, new StatisticCounterComponent(), RenderPosition.BEFOREEND);
