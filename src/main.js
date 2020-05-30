import API from "./api/index.js";
import Provider from "./api/provider.js";
import {AUTHORIZATION, END_POINT} from "./constants";
import UserProfileComponent from "./components/user-profile-component.js";
import MenuComponent from "./components/menu-component.js";
import FilmsBoardComponent from "./components/films-board-component.js";
import StatisticCounterComponent from "./components/statistic-counter-component.js";
import {render} from "./utils/render.js";
import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter";
import Movies from "./models/movies";
import StatisticsComponent from "./components/statistics-component";
const movies = new Movies();
const api = new API(AUTHORIZATION, END_POINT);
const apiWithProvider = new Provider(api, movies);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
const boardComponent = new FilmsBoardComponent();

const menuComponent = new MenuComponent();
const filterController = new FilterController(menuComponent.getElement(), movies);
const pageController = new PageController(boardComponent, movies, apiWithProvider);

const statisticsComponent = new StatisticsComponent(movies);
const statisticCounterComponent = new StatisticCounterComponent(movies);


render(siteMainElement, menuComponent);
render(siteMainElement, boardComponent);


menuComponent.setOnChangeHandler((menuItem) => {
  switch (menuItem) {
    case `stats`:
      statisticsComponent.show();
      pageController.hide();
      break;
    default:
      statisticsComponent.hide();
      pageController.show();
  }
});

apiWithProvider.getFilms()
  .then((films) => {
    movies.setFilms(films);
    pageController.render();
    filterController.render();

    render(siteMainElement, statisticsComponent);
    render(siteFooterStatisticElement, statisticCounterComponent);
    render(siteHeaderElement, new UserProfileComponent(movies));
    statisticsComponent.hide();
  })
  .catch((err) => {
    throw new Error(err);
  });
