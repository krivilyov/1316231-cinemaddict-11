export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
    this.authorName = comment[`author`];
    this.message = comment[`comment`];
  }

  getComment() {
    return {
      "id": this.id,
      "date": this.date,
      "emotion": this.emotion,
      "authorName": this.authorName,
      "message": this.message,
    };
  }

  toRAW() {
    return {
      "id": this.id,
      "date": this.date,
      "emotion": this.emotion,
      "authorName": this.authorName,
      "message": this.message,
    };
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }
}
