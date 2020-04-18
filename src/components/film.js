export const createFilmTemplate = (film) => {
  const {previewImage, name, rating, releaseDate, runtime, genres, description, commentsCount} = film;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres}</span>
          </p>
          <img src="${previewImage}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.substr(0, 137)}...</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
    </article>`
  );
};
