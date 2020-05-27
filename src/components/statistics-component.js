import SmartAbstractComponent from "./smart-abstract-component";
import {TimeFilter} from "../constants";
import {getFilteredFilms} from "../utils/filter";
import moment from "moment";

const createStatisticsTemplate = () => {
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

// TO DO для работы фильтров нужна вся инфа с api

// const BAR_HEIGHT = 50;

// const renderChart = (films, statisticCtx) => {
//   // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
//   statisticCtx.height = BAR_HEIGHT * genres.length;
//
//   return new Chart(statisticCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: getCountedGenres(films).map((genre) => genre.name),
//       datasets: [{
//         data: getCountedGenres(films).map((genre) => genre.count),
//         backgroundColor: `#ffe800`,
//         hoverBackgroundColor: `#ffe800`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 20
//           },
//           color: `#ffffff`,
//           anchor: `start`,
//           align: `start`,
//           offset: 40,
//         }
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#ffffff`,
//             padding: 100,
//             fontSize: 20
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 24
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false
//       }
//     }
//   });
// };

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
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    // this.reRender();
  }

  reRender() {
    super.reRender();
    this.recoveryListeners();
  }

  recoveryListeners() {

  }

  _renderCharts() {
    // const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    const watchedFilmsByPeriod = getWatchedFilmsByPeriod(this._films.getFilms(), this._currentTimeFilter);

    if (watchedFilmsByPeriod.length > 0) {
      // renderChart(watchedFilmsByPeriod, statisticCtx, this._currentTimeFilter);
    }
  }
}
