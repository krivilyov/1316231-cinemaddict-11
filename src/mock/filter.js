import {FILTER_NAMES} from "../constants.js";
import {getRandomNumber} from "../utils";

const generateFilters = () => {
  return FILTER_NAMES.map((value) => {
    return {
      id: value.id,
      name: value.name,
      count: getRandomNumber(0, 10),
    };
  });
};

export {generateFilters};
