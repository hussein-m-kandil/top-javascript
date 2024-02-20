// Book constructor for Odin Library
export default class Book {
  static #booksCount = 0;

  constructor(title, author, numOfPages, readState) {
    this.id = String(++Book.#booksCount);
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readState = Boolean(readState);
  }

  /**
   * A setter for readState property
   *
   * @param {boolean} readState
   *
   * @returns {void}
   */
  setReadState(readState) {
    if (typeof readState === "boolean") {
      this.readState = readState;
    }
  }
}
