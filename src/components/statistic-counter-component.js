import AbstractSmartComponent from "./smart-abstract-component";

const createStatisticCounterTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount ? `${filmsCount} movies inside` : `0 movies inside`}</p>`
  );
};

export default class StatisticCounterComponent extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._films = movies;
  }

  getTemplate() {
    return createStatisticCounterTemplate(this._films.getFilms().length);
  }
}
