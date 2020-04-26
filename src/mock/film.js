import {PREVIEW_IMAGES, FILM_NAMES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES} from "../constants.js";
import {generateComments, generateRandomDate} from "./comments";
import {getRandomNumber, getRandomItem, getRandomItems} from "../utils";

const generatePreviewImage = (key) => {
  return PREVIEW_IMAGES[key];
};

const generateName = (key) => {
  return FILM_NAMES[key];
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateTime = () => {
  return {
    hour: getRandomNumber(1, 2),
    minutes: getRandomNumber(1, 60)
  };
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

const generateFilm = () => {
  const key = getRandomNumber(0, 6);

  return {
    previewImage: generatePreviewImage(key),
    fullImage: generatePreviewImage(key),
    name: generateName(key),
    originalName: generateName(key),
    rating: generateRating(),
    director: getRandomItem(DIRECTORS),
    writers: getRandomItem(WRITERS),
    actors: getRandomItems(ACTORS, getRandomNumber(1, ACTORS.length)),
    releaseDate: generateRandomDate(),
    runtime: generateTime(),
    country: getRandomItem(COUNTRIES),
    genres: getRandomItems(GENRES, getRandomNumber(1, GENRES.length)),
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
