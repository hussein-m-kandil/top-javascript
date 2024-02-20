import Book from "./app/book.js";
import {
  LOCAL_STORAGE_KEY,
  addBookToDOM,
  addNewBookFormToDOM,
  addNewBookDialogToDOM,
} from "./app/main-functions.js";
import "./assets/css/styles.css"; // CSS Styles

// STATE LOGIC

const myLibrary = [];

if (localStorage) {
  const odinLibraryBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (odinLibraryBooks) {
    myLibrary.push(...JSON.parse(odinLibraryBooks));
  }
}

if (myLibrary.length > 0) {
  // Re-instantiate books comes from localStorage from 'Book' class
  myLibrary.splice(
    0,
    myLibrary.length,
    ...myLibrary.map((book) => {
      return new Book(book.title, book.author, book.numOfPages, book.readState);
    })
  );
} else {
  // Fill the library with some dummy books if not filled
  myLibrary.push(
    new Book("Murder On The Orient Express", "Agatha Christie", "256")
  );
  myLibrary.push(new Book("Death on the Nile", "Agatha Christie", "288", true));
}

// MAIN LOGIC

// Add header
document.body.appendChild(
  document
    .createElement("h1")
    .appendChild(document.createTextNode("Odin Library")).parentElement
);
// Add new-book form' to the DOM
if (!window.HTMLDialogElement) {
  addNewBookFormToDOM(document.body, myLibrary); // Only if no modal support
} else {
  // If modal support create new-book button and modal, then add form to modal
  addNewBookDialogToDOM(myLibrary);
}
// Create and add books container
const booksContainer = document.createElement("div");
booksContainer.className = "books-container";
document.body.appendChild(booksContainer);
// Add book to the DOM
for (let i = myLibrary.length - 1; i >= 0; i--) {
  addBookToDOM(myLibrary[i], booksContainer, myLibrary);
}
