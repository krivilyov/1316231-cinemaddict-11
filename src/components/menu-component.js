import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {

  return (
    `<nav class="main-navigation">
        <a href="#stats" id="stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MenuComponent extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  // removesLinkSelection() {
  //   this.getElement().querySelector(`.main-navigation__item`).classList.remove(`main-navigation__item--active`);
  // }

  setOnChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
