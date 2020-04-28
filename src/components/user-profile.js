import {createElement} from "../utils";

const createUserProfileTemplate = (userProfile) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userProfile.status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfileComponent {
  constructor(userProfile) {
    this._userProfile = userProfile;

    this.element = null;
  }

  getTemplate() {
    return createUserProfileTemplate(this._userProfile);
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
