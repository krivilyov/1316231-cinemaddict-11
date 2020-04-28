import {createElement} from "../utils";

const createFilmsMainContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsMainContainerComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsMainContainerTemplate();
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
