import {PREVIEW_IMAGES, FILM_NAMES, DIRECTORS, WRITERS, ACTORS, MONTHS, COUNTRIES, GENRES} from "../constants.js";
import {generateComments} from "./comments";
import {getRandomNumber} from "../utils";
import {getRandomItem} from "../utils";

const generatePreviewImage = (key) => {
  return PREVIEW_IMAGES[key];
};

const generateName = (key) => {
  return FILM_NAMES[key];
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateDirector = () => {
  return DIRECTORS[getRandomNumber(0, 5)];
};

const generateDate = () => {
  const start = new Date(`1948-01-01`).getTime();
  const end = new Date(`2011-02-01`).getTime();
  let date = new Date((Math.random() * (end - start)) + start);
  date = (`0` + date.getDate()).slice(-2) + ` ` + MONTHS[date.getMonth() - 1] + ` ` + date.getFullYear();

  return date;
};

const generateTime = () => {
  const hour = getRandomNumber(1, 2);
  const minutes = getRandomNumber(1, 60);

  return `${hour}h ${minutes}m`;
};

const generateCountry = () => {
  return COUNTRIES[getRandomNumber(0, COUNTRIES.length)];
};

const generateDescription = () => {
  let description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
  const text = `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const texts = text.split(`.`);
  const quantityLines = getRandomNumber(1, 5);

  if (quantityLines > 1) {
    for (let i = 1; i < quantityLines; i++) {
      description = description + texts[i] + `.`;
    }
  }

  return description;
};

const generateGenres = () => {
  let genres = [];
  const point = getRandomNumber(0, GENRES.length);

  for (let i = 0; i <= point; i++) {
    genres.push(GENRES[i]);
  }

  return genres;
};

const generateFilm = () => {
  const key = getRandomNumber(0, 6);

  return {
    previewImage: generatePreviewImage(key),
    fullImage: generatePreviewImage(key),
    name: generateName(key),
    originalName: generateName(key),
    rating: generateRating(),
    director: generateDirector(),
    writers: getRandomItem(WRITERS),
    actors: getRandomItem(ACTORS),
    releaseDate: generateDate(),
    runtime: generateTime(),
    country: generateCountry(),
    genres: generateGenres(),
    description: generateDescription(),
    ratingAge: getRandomNumber(0, 18),
    comments: generateComments(),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
