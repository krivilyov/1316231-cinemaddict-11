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
}
