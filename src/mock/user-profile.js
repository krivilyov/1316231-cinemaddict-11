// будет приходить с сервера
const maxNumber = Math.pow(10, 1000);
const statuses = [
  {name: `novice`, min: 1, max: 10},
  {name: `fan`, min: 11, max: 20},
  {name: `movie buff`, min: 21, max: maxNumber},
];

const createUserProfile = () => {
  const quantityViewedFilms = Math.floor(Math.random() * 100);
  let userProfile = {
    rating: ``,
  };

  if (statuses && statuses.length > 0) {
    statuses.forEach((statusParams) => {
      if (quantityViewedFilms >= statusParams.min && quantityViewedFilms <= statusParams.max) {
        userProfile.rating = statusParams.name;
      }
    });
  }

  return userProfile;
};

export {createUserProfile};
