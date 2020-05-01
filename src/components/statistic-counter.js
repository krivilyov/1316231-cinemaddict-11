import {createElement} from "../utils";

const createStatisticCounterTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class StatisticCounter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticCounterTemplate();
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
