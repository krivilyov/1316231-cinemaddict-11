const maxNumber = Math.pow(10, 1000);
const userProfiles = [
  {name: `novice`, min: 1, max: 10},
  {name: `fan`, min: 11, max: 20},
  {name: `movie buff`, min: 21, max: maxNumber},
];

const currentUserProfile = () => {
  const quantityViewedFilms = Math.floor(Math.random() * 100);

  let result = false;

  userProfiles.map((profilParams) => {
    if (quantityViewedFilms >= profilParams.min && quantityViewedFilms <= profilParams.max) {
      result = profilParams.name;
    }
  });

  return result;
};

export {currentUserProfile};
