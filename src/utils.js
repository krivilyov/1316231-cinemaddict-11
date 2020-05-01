export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const removeElement = (element) => {
  element.getElement().remove();
  element.removeElement();
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
