export const getRandomNumber = (pointStart = 0, pointStop = 0) => {
  let number = 0;

  number = Math.floor((Math.random() * pointStop) + pointStart);

  return number;
};

export const getRandomItem = (items) => {
  let item = ``;

  for (const index in items) {
    if (index < getRandomNumber(1, items.length)) {
      if (parseInt(index, 16) === 0) {
        item = item + items[index];
      } else {
        item = item + `, ` + items[index];
      }
    } else {
      break;
    }
  }

  return item;
};
