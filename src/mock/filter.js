import {FILTER_NAMES} from "../constants.js";
import {getRandomNumber} from "../utils/common";

const generateFilters = () => {
  return FILTER_NAMES.map((value) => ({
    id: value.id,
    name: value.name,
    count: getRandomNumber(0, 10),
  }));
};

export {generateFilters};
