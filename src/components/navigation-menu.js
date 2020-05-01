import {createElement} from "../utils";

const createFilterMarkup = (filter, isActive) => {
  const {id, name, count} = filter;
  const active = isActive ? ` main-navigation__item--active` : ``;
  const quantity = id !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (`<a href="#${id}" class="main-navigation__item${active}">${name} ${quantity}</a>`);
};

const createMenuTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filterMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
