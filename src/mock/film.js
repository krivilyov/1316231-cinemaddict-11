import {PREVIEW_IMAGES, FILMS_NAME, DIRECTORS, WRITERS, ACTORS, MONTHS, COUNTRIES, GENRES} from "../constants.js";

const generatePreviewImage = (key) => {
  return PREVIEW_IMAGES[key];
};

const generateName = (key) => {
  return FILMS_NAME[key];
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateDirector = () => {
  return DIRECTORS[Math.floor(Math.random() * 5)];
};

const generateEssence = (essence) => {
  const breakPoint = Math.floor((Math.random() * essence.length) + 1);
  let result = ``;

  for (const index in essence) {
    if (index < breakPoint) {
      if (parseInt(index, 16) === 0) {
        result = result + essence[index];
      } else {
        result = result + `, ` + essence[index];
      }
    } else {
      break;
    }
  }

  return result;
};

const generateDate = () => {
  const start = new Date(`1948-01-01`).getTime();
  const end = new Date(`2011-02-01`).getTime();
  let date = new Date((Math.random() * (end - start)) + start);
  date = (`0` + date.getDate()).slice(-2) + ` ` + MONTHS[date.getMonth() - 1] + ` ` + date.getFullYear();

  return date;
};

const generateTime = () => {
  const hour = Math.floor((Math.random() * 2) + 1);
  const minutes = Math.floor((Math.random() * 60) + 1);

  return hour + `h ` + minutes + `m`;
};

const generateCountry = () => {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
};

const generateFilm = () => {
  const key = Math.floor(Math.random() * 6);

  return {
    previewImage: generatePreviewImage(key),
    fullImage: generatePreviewImage(key),
    name: generateName(key),
    originalName: generateName(key),
    rating: generateRating(),
    director: generateDirector(),
    writers: generateEssence(WRITERS),
    actors: generateEssence(ACTORS),
    releaseDate: generateDate(),
    runtime: generateTime(),
    country: generateCountry(),
    genres: generateEssence(GENRES),
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.`,
    ratingAge: Math.floor((Math.random() * 18) + 7),
    commentsCount: Math.floor(Math.random() * 100),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
