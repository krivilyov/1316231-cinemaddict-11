import AbstractComponent from "./abstract-component.js";

const createFilmsBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsBoardComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}
