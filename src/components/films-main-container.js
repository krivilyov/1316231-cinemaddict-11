import AbstractComponent from "./abstract-component.js";

const createFilmsMainContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsMainContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsMainContainerTemplate();
  }
}
