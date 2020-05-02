import AbstractComponent from "./abstract-component.js";

const createStatisticCounterTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class StatisticCounter extends AbstractComponent {
  getTemplate() {
    return createStatisticCounterTemplate();
  }
}
