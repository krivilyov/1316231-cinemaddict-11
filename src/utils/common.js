import {StatusCode} from "../constants";

export const getRandomNumber = (pointStart = 0, pointStop = 0) => {
  return Math.floor((Math.random() * pointStop) + pointStart);
};

export const getRandomItem = (items) => {
  return items[getRandomNumber(0, items.length - 1)];
};

export const getRandomItems = (items, count) => {
  let newItems = [];
  const itemsToProcess = [...items];

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNumber(0, itemsToProcess.length);
    newItems.push(...itemsToProcess.splice(randomIndex, 1));
  }
  return newItems;
};

export const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
