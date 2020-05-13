import {FilterTypes} from "./../utils/filter.js";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilter = FilterTypes.ALL;
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }

  updateFilm(id, newFilm) {

    if (id === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, id), newFilm, this._films.slice(id + 1));
  }
}
