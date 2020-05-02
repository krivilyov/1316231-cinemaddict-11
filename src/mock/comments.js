import {EMOJI, COMMENTATOR_NAMES, COMMENTS_CONTENT} from "../constants.js";
import {getRandomItem, getRandomNumber} from "../utils/common";

export const generateRandomDate = () => {
  const start = new Date(`2020-03-20`).getTime();
  const end = new Date(`2020-04-21`).getTime();
  const randomDate = new Date((Math.random() * (end - start)) + start);

  return randomDate;
};

const generateComment = () => {
  return {
    date: generateRandomDate(),
    emoji: getRandomItem(EMOJI),
    authorName: getRandomItem(COMMENTATOR_NAMES),
    content: getRandomItem(COMMENTS_CONTENT),
  };
};

const generateComments = () => {
  const count = getRandomNumber(1, 5);

  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
