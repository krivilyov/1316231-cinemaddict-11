import {render, RenderPosition} from "./../utils/render.js";
import {FilterTypes} from "./../utils/filter.js";
import FilterComponent from "../components/filter-component.js";

export default class FilterController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;

    this._activeFilter = FilterTypes.ALL;

    this._filterComponent = null;
  }

  render() {

  }

  onLoading() {
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: 0,
        isChecked: filter === this._activeFilter,
      };
    });

    this._filterComponent = new FilterComponent(filterData);
    render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
  }
}
