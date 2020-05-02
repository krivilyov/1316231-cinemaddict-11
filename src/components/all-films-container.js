import AbstractComponent from "./abstract-component.js";

const createAllFilmsContainerTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class AllFilmsContainer extends AbstractComponent {
  getTemplate() {
    return createAllFilmsContainerTemplate();
  }
}
