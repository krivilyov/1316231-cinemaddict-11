import Movie from "../models/movie.js";
import {URL, METHOD} from "../constants";
import {checkStatus} from "../utils/common.js";
import Comment from "../models/comment";
import LocalComment from "../models/local-comment";

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getFilms() {
    return this._load({url: URL.MOVIES})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  getComments(id) {
    return this._load({url: `${URL.COMMENTS}/${id}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  addComment(id, comment) {
    return this._load({
      url: `${URL.COMMENTS}/${id}`,
      method: METHOD.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(LocalComment.parseComment)
      .then((film) => film.comments);
  }

  updateFilm(id, film) {
    return this._load({
      url: `${URL.MOVIES}/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  removeComment(id) {
    return this._load({
      url: `${URL.COMMENTS}/${id}`,
      method: METHOD.DELETE,
    });
  }
}
