import {StatusCode, SHAKE_ANIMATION_TIMEOUT} from "../constants";

export const getRandomNumber = (pointStart = 0, pointStop = 0) => {
  return Math.floor((Math.random() * pointStop) + pointStart);
};

export const getRandomItem = (items) => {
  return items[getRandomNumber(0, items.length - 1)];
};

export const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const shake = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
