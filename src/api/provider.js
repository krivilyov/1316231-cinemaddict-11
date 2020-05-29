export default class Provider {
  constructor(api, movies) {
    this._api = api;
    this._movies = movies;
  }

  getFilms() {
    return this._api.getFilms()
      .then((films) => {
        const filmsById = films.reduce((acc, film) => {
          return Object.assign({}, acc, {[film.id]: film.toRAW()});
        }, {});

        this._movies.setFilms(filmsById);

        return films;
      });
  }

  updateFilm(id, film) {
    return this._api.updateFilm(id, film)
      .then((newFilm) => newFilm);
  }

  getComments(id) {
    return this._api.getComments(id);
  }

  addComment(id, comment) {
    return this._api.addComment(id, comment);
  }

  removeComment(id) {
    return this._api.removeComment(id);
  }
}
