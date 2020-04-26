export const createCommentsBlock = (comment) => {
  const {date, emoji, authorName, content} = comment;

  const formattedDate = formatDate(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${content}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const formatDate = (date) => {
  const currentDate = new Date();
  let newDate;

  // переводим время в UNIX и разницу при сравнении в кол-во дней
  const quantityDays = Math.round(((currentDate.getTime() - date.getTime()) / 86400000));

  if (quantityDays > 7) {
    newDate = `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  } else if (quantityDays > 1) {
    newDate = `${quantityDays} days ago`;
  } else {
    newDate = `Today`;
  }

  return newDate;
};
