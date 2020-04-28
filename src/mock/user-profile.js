const maxNumber = Math.pow(10, 1000);
const userProfile = {
  statuses: [
    {name: `novice`, min: 1, max: 10},
    {name: `fan`, min: 11, max: 20},
    {name: `movie buff`, min: 21, max: maxNumber},
  ],
  currentStatus: ``,
};

const currentUserProfile = () => {
  const quantityViewedFilms = Math.floor(Math.random() * 100);

  if (userProfile.statuses && userProfile.statuses.length > 0) {
    userProfile.statuses.forEach((statusParams) => {
      if (quantityViewedFilms >= statusParams.min && quantityViewedFilms <= statusParams.max) {
        userProfile.currentStatus = statusParams.name;
      }
    });
  }

  return userProfile;
};

export {currentUserProfile};
