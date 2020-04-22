import {EMOJI} from "../constants.js";

const generateRandomDate = () => {
  const start = new Date(`2019-04-20`).getTime();
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
  return EMOJI[Math.floor(Math.random() * EMOJI.length)];
};

const commentatorsName = [
  `Sylvester Stallone`,
  `Chuck Norris`,
  `Jean-Claude Van Damme`,
  `Arnold Schwarzenegger`,
  `Jackie Chan`,
  `Kurt Russell`,
];

const commentsContent = [
  `It's cool!`,
  `It's funny!`,
  `I like it!`,
  `I love this film!`,
  `Boring!`,
  `Bad film!`,
];

const generateCommentatorName = () => {
  return commentatorsName[Math.floor(Math.random() * commentatorsName.length)];
};

const generateCommentText = () => {
  return commentsContent[Math.floor(Math.random() * commentsContent.length)];
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
  const count = Math.floor(Math.random() * 5 + 1);

  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
