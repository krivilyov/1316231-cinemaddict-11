import {EMOJI, COMMENTATORS_NAME, COMMENTS_CONTENT} from "../constants.js";
import {getRandomNumber} from "../utils";

const generateRandomDate = () => {
  const start = new Date(`2020-03-20`).getTime();
  const end = new Date(`2020-04-21`).getTime();
  let randomDate = new Date((Math.random() * (end - start)) + start);
  randomDate = randomDate.getFullYear() + `/` + (randomDate.getMonth() + 1) + `/` + randomDate.getDate() + ` ` + randomDate.getHours() + `:` + randomDate.getMinutes();

  return randomDate;
};

const generateDate = () => {
  const randomDate = generateRandomDate();
  const currentDate = new Date();
  const commentDate = new Date(randomDate);
  let date = `${randomDate}`;

  // переводим время в UNIX и разницу при сравнении в кол-во дней
  const quantityDays = Math.round(((currentDate.getTime() - commentDate.getTime()) / 86400000));
  if (quantityDays > 1) {
    // проверяем кол-во дней до 7, далее оборажаться будет дата из commentDate
    if (quantityDays <= 7) {
      date = `${quantityDays} days ago`;
    }
  } else {
    date = `Today`;
  }

  return date;
};

const generateEmoji = () => {
  return EMOJI[getRandomNumber(0, EMOJI.length)];
};

const generateCommentatorName = () => {
  return COMMENTATORS_NAME[getRandomNumber(0, COMMENTATORS_NAME.length)];
};

const generateCommentText = () => {
  return COMMENTS_CONTENT[getRandomNumber(0, COMMENTS_CONTENT.length)];
};

const generateComment = () => {
  return {
    date: generateDate(),
    emoji: generateEmoji(),
    authorName: generateCommentatorName(),
    content: generateCommentText(),
  };
};

const generateComments = () => {
  const count = getRandomNumber(1, 5);

  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
