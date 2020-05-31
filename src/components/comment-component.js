import AbstractComponent from "./abstract-component.js";
import {encode} from "he";
import moment from "moment";
import {MSEK_IN_DAY, QUANTITY_DAYS_IN_WEEK, TODAY} from "../constants";

const createCommentsContainer = (comment, isDeletingButton) => {

  const {id, date, emotion, authorName, message: currentMessage} = comment;

  const message = encode(currentMessage);
  const formattedDate = formatDate(date);
  const buttonText = isDeletingButton ? `Deleting…` : `Delete`;

  return (
    `<li data-id="${id}" class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button data-id="${id}" class="film-details__comment-delete">${buttonText}</button>
        </p>
      </div>
    </li>`
  );
};

const formatDate = (date) => {
  // plugin moment
  const currentDate = new Date();
  let newDate;

  // переводим время в UNIX и разницу при сравнении в кол-во дней
  const quantityDays = Math.round(((currentDate.getTime() - currentDate.getTime()) / MSEK_IN_DAY));
  if (quantityDays > QUANTITY_DAYS_IN_WEEK) {
    newDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  } else if (quantityDays > TODAY) {
    newDate = `${quantityDays} days ago`;
  } else {
    newDate = `Today`;
  }

  return newDate;
};

export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentsContainer(this._comment);
  }
}
