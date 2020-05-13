import {FilterTypes} from "../utils/filter.js";
import AbstractComponent from "./abstract-component";

const createFiltersTemplate = (filterData, activeFilter) => {
  const filterLinks = filterData.map((filter) => {
    const {title, count} = filter;
    const activeClass = activeFilter === title ? `main-navigation__item--active` : ``;
    const quantity = title !== `All movies` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
    return (
      `<a href="#${title}" class="main-navigation__item ${activeClass}">${title} ${quantity}</a>`
    );
  }).join(``);

  return `<div class="main-navigation__items">${filterLinks}</div>`;
};

export default class FilterComponent extends AbstractComponent {
  constructor(filterData) {
    super();
    this._filterData = filterData;
    this._activeFilter = FilterTypes.ALL;
  }

  getTemplate() {
    return createFiltersTemplate(this._filterData, this._activeFilter);
  }
}
