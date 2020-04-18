import {FILTER_NAMES} from "../constants.js";

const generateFilters = () => {
  return FILTER_NAMES.map((value) => {
    return {
      id: value.id,
      name: value.name,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
