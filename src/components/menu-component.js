import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {

  return (
    `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MenuComponent extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  removesLinkSelection() {
    this.getElement().querySelector(`.main-navigation__item`).classList.remove(`main-navigation__item--active`);
  }
}
