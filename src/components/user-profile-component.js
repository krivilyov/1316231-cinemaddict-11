import AbstractSmartComponent from "./smart-abstract-component";
import {getFilteredFilms} from "../utils/filter";
import {FilterTypes, Rank} from "../constants";

export const getUserRank = (count) => {
  let rank = ``;

  Object.keys(Rank).forEach((key) => {
    if (count > Rank[key].value) {
      rank = Rank[key].name;
    }
  });

  return rank;
};

const createUserProfileTemplate = (films) => {

  const watchedFilmsCount = getFilteredFilms(FilterTypes.HISTORY, films).length;
  const rank = getUserRank(watchedFilmsCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfileComponent extends AbstractSmartComponent {
  constructor(movies) {
    super();

    this._films = movies;
  }

  getTemplate() {
    return createUserProfileTemplate(this._films.getFilms());
  }
}
