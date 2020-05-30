import SmartAbstractComponent from "./smart-abstract-component";
import {TimeFilter, genres} from "../constants";
import {getFilteredFilms} from "../utils/filter";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const createFilterMarkup = (filter, isCkecked) => {
  const {name, label} = filter;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${label}" value="${label}" ${isCkecked ? `checked` : ``}>
    <label for="statistic-${label}" class="statistic__filters-label for="statistic-${label}">${name}</label>`
  );
};

const createStatisticsTemplate = (films, currentFilter) => {
  const duration = films.reduce((filmsDuration, film) => {
    filmsDuration += film.runtime;
    return filmsDuration;
  }, 0);

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  let timeFiltersMarkup = ``;
  for (const filter in TimeFilter) {
    if (filter) {
      timeFiltersMarkup = timeFiltersMarkup.concat(createFilterMarkup(TimeFilter[filter], currentFilter === TimeFilter[filter].label));
    }
  }

  const topGenre = films.length > 0 ? getTopGenre(films) : ``;

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${timeFiltersMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

const getCountedGenres = (films) => {
  const values = genres.map((genre) =>
    films.filter((film) =>
      film.genres.includes(genre))
      .length);

  const genresCount = [];
  genres.forEach((genre, i) => genresCount.push(
      {
        name: genre,
        count: values[i],
      }));

  const sortedGenresCount = genresCount.sort((a, b) => b.count - a.count);

  return sortedGenresCount;
};

const getTopGenre = (films) => getCountedGenres(films)[0].name;

const BAR_HEIGHT = 50;

const renderChart = (films, statisticCtx) => {
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getCountedGenres(films).map((genre) => genre.name),
      datasets: [{
        data: getCountedGenres(films).map((genre) => genre.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getWatchedFilmsByPeriod = (films, period) => {
  const watchedFilms = getFilteredFilms(`History`, films);

  if (period === TimeFilter.ALLTIME.label) {
    return watchedFilms;
  }

  const startOfPeriod = moment().startOf(period);

  return watchedFilms.filter((film) => moment(film.watchingDate).isAfter(startOfPeriod));
};


export default class StatisticsComponent extends SmartAbstractComponent {
  constructor(movies) {
    super();

    this._films = movies;
    this._renderCharts();
    this._currentTimeFilter = TimeFilter.ALLTIME.label;

    this._setTimeFilterHandlers();
  }

  getTemplate() {
    return createStatisticsTemplate(getWatchedFilmsByPeriod(this._films.getFilms(), this._currentTimeFilter), this._currentTimeFilter);
  }

  show() {
    super.show();

    this.reRender();

    this._setTimeFilterHandlers();
  }

  reRender() {
    super.reRender();
    this._renderCharts();
    this.recoveryListeners();
  }

  recoveryListeners() {
    this._setTimeFilterHandlers();
  }

  _renderCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    const watchedFilmsByPeriod = getWatchedFilmsByPeriod(this._films.getFilms(), this._currentTimeFilter);

    if (watchedFilmsByPeriod.length > 0) {
      renderChart(watchedFilmsByPeriod, statisticCtx, this._currentTimeFilter);
    }
  }

  _setTimeFilterHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const filterData = evt.target.getAttribute(`for`);

      if (filterData) {
        this._currentTimeFilter = filterData.substring(filterData.length, `statistic-`.length);
      }

      this.reRender();
    });
  }
}
