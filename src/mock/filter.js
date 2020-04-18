import {FILTERS_NAME} from "../constants.js";

const generateFilters = () => {
  let filterParams = [];

  FILTERS_NAME.forEach((value) => {
    value.count = Math.floor(Math.random() * 10);
    filterParams.push(value);
  });

  return filterParams;
};

export {generateFilters};
