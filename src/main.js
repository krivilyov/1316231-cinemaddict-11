import {FILMS_COUNT} from "./constants";
import UserProfileComponent from "./components/user-profile-component.js";
import MenuComponent from "./components/menu-component.js";
import FilmsBoardComponent from "./components/films-board-component.js";
import StatisticCounterComponent from "./components/statistic-counter-component.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import PageController from "./controllers/page.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);

const userProfile = generateUserProfile();
const filters = generateFilters();
const films = generateFilms(FILMS_COUNT);

render(siteHeaderElement, new UserProfileComponent(userProfile), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(filters), RenderPosition.BEFOREEND);


const boardComponent = new FilmsBoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(boardComponent);
pageController.render(films);

render(siteFooterStatisticElement, new StatisticCounterComponent(), RenderPosition.BEFOREEND);
