import Book from "./book.js";
import {
  createBookCardBodyEntry,
  createLabelAndInput,
  createButton,
  setAttributes,
  readStateToggler,
  storeOnLocalStorage,
} from "./helper-functions.js";

// MAIN FUNCTIONS FOR ODIN LIBRARY

const LOCAL_STORAGE_KEY = "odin-library-books";

/**
 * Adds book card to the given books' container using the given book's data.
 * @param {Book} book
 * @param {HTMLDivElement} booksContainer
 * @returns {void}
 */
function addBookToDOM(book, booksContainer, libraryArr) {
  // Book card
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  // Book card title
  const bookTitle = document
    .createElement("div")
    .appendChild(document.createTextNode(book.title)).parentElement;
  bookTitle.className = "book-card-title";
  // Book card body
  const bookCardBody = document.createElement("div");
  bookCardBody.className = "book-card-body";
  bookCardBody.appendChild(createBookCardBodyEntry("Author", book.author));
  bookCardBody.appendChild(
    createBookCardBodyEntry("Number of Pages", book.numOfPages)
  );
  const readStateDiv = createBookCardBodyEntry(
    "Read",
    book.readState ? "Yes" : "No"
  );
  readStateDiv.id = "read-state-" + book.id;
  readStateDiv.lastChild.classList.add(
    book.readState ? "success-text" : "danger-text"
  );
  bookCardBody.appendChild(readStateDiv);
  // Book card buttons
  const bookCardButtons = document.createElement("div");
  bookCardButtons.className = "book-card-buttons";
  const bookReadStateBtn = createButton(
    "Mark as " + (book.readState ? "not read" : "read"),
    "button",
    book.readState
      ? "danger-border danger-text"
      : "success-border success-text",
    "read-state-toggler-" + book.id,
    book.id
  );
  bookReadStateBtn.addEventListener("click", (event) => {
    const bookId = event.target.value;
    for (let i = 0; i < libraryArr.length; i++) {
      if (libraryArr[i].id === bookId) {
        libraryArr[i].setReadState(!libraryArr[i].readState);
        if (libraryArr[i].readState) {
          readStateToggler(
            event.target,
            "Mark as not read",
            "success-border",
            "danger-border",
            document.querySelector("#read-state-" + bookId).lastChild,
            "Yes",
            "danger-text",
            "success-text"
          );
        } else {
          readStateToggler(
            event.target,
            "Mark as read",
            "danger-border",
            "success-border",
            document.querySelector("#read-state-" + bookId).lastChild,
            "No",
            "success-text",
            "danger-text"
          );
        }
        break;
      }
    }
    storeOnLocalStorage(LOCAL_STORAGE_KEY, libraryArr);
  });
  const bookDeleteBtn = createButton(
    "Delete",
    "button",
    "danger-text danger-border",
    "book-card-del-btn-" + book.id,
    book.id
  );
  bookDeleteBtn.addEventListener("click", (event) => {
    for (let i = 0; i < libraryArr.length; i++) {
      if (libraryArr[i].id === event.target.value) {
        libraryArr.splice(i, 1);
        try {
          document
            .querySelector(".books-container")
            ?.removeChild(event.target.parentElement.parentElement);
        } catch (error) {
          console.log(error.message);
        }
        break;
      }
    }
    storeOnLocalStorage(LOCAL_STORAGE_KEY, libraryArr);
  });
  bookCardButtons.append(bookReadStateBtn, bookDeleteBtn);
  bookCard.append(bookTitle, bookCardBody, bookCardButtons);
  booksContainer.insertBefore(bookCard, booksContainer.firstChild);
}

/**
 * Adds a 'form' element for adding new book in the given parent node.
 * @param {Node} parentNode - Paren node to append the form to it.
 * @returns {void}
 */
function addNewBookFormToDOM(parentNode, libraryArr) {
  // Create the form
  const newBookForm = document.createElement("form");
  newBookForm.className = "new-book-form";
  const [titleLabel, titleInput] = createLabelAndInput(
    "Title: ",
    [["for", "title"]],
    [
      ["type", "text"],
      ["id", "title"],
      ["name", "title"],
      ["autocomplete", "on"],
      ["required", ""],
    ]
  );
  if (window.HTMLDialogElement) titleInput.autofocus = true;
  newBookForm.appendChild(
    document
      .createElement("div")
      .appendChild(titleLabel)
      .parentElement.appendChild(titleInput).parentElement
  );
  const [authorLabel, authorInput] = createLabelAndInput(
    "Author: ",
    [["for", "author"]],
    [
      ["type", "text"],
      ["id", "author"],
      ["name", "author"],
      ["autocomplete", "on"],
      ["required", ""],
    ]
  );
  newBookForm.appendChild(
    document
      .createElement("div")
      .appendChild(authorLabel)
      .parentElement.appendChild(authorInput).parentElement
  );
  const [pagesNumLabel, pagesNumInput] = createLabelAndInput(
    "Number of Pages: ",
    [["for", "pages-number"]],
    [
      ["type", "tel"],
      ["id", "pages-number"],
      ["name", "pages-number"],
      ["pattern", "^[0-9]{1,7}$"],
      ["autocomplete", "on"],
      ["required", ""],
    ]
  );
  // Number validation
  pagesNumInput.addEventListener("invalid", (event) => {
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity("Numbers only are allowed here.");
    } else {
      event.target.setCustomValidity("");
    }
  });
  pagesNumInput.addEventListener("input", (event) => {
    if (event.target.checkValidity() && event.target.validity.customError) {
      event.target.setCustomValidity("");
    }
  });
  newBookForm.appendChild(
    document
      .createElement("div")
      .appendChild(pagesNumLabel)
      .parentElement.appendChild(pagesNumInput).parentElement
  );
  const [readStateLabel, readStateInput] = createLabelAndInput(
    " Did you read this book?",
    [["for", "read-state"]],
    [
      ["type", "checkbox"],
      ["id", "read-state"],
      ["name", "read-state"],
    ]
  );
  newBookForm.appendChild(
    document
      .createElement("div")
      .appendChild(readStateInput)
      .parentElement.appendChild(readStateLabel).parentElement
  );
  const submitBtn = createButton("Add New Book", "submit", "success-color");
  newBookForm.appendChild(
    document.createElement("div").appendChild(submitBtn).parentElement
  );
  // Add the form to DOM
  parentNode.appendChild(newBookForm);
  // Handle form submission
  newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    const newBook = new Book(
      formElements["title"].value,
      formElements["author"].value,
      formElements["pages-number"].value,
      formElements["read-state"].checked
    );
    libraryArr.unshift(newBook);
    storeOnLocalStorage(LOCAL_STORAGE_KEY, libraryArr);
    addBookToDOM(
      newBook,
      document.querySelector(".books-container"),
      libraryArr
    );
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].value = "";
      if (formElements[i].type === "checkbox") formElements[i].checked = false;
    }
    if (event.target.parentElement instanceof HTMLDialogElement) {
      event.target.parentElement.close(); // Close the dialog if any
    }
  });
}

/**
 * Adds, to 'body' element, a new 'dialog' with a 'form' for adding a new book.
 * @returns {void}
 */
function addNewBookDialogToDOM(libraryArr) {
  // Button to show the dialog
  const newBookBtn = createButton("+", "button", "new-book-dialog-show-btn");
  newBookBtn.addEventListener("click", () => {
    document.querySelector("dialog").showModal();
  });
  setAttributes(newBookBtn, [
    ["aria-label", "Add new book"],
    ["title", "Add new book"],
  ]); // For better accessibility
  document.body.appendChild(
    document.createElement("div").appendChild(newBookBtn).parentElement
  );
  // New book dialog
  const formDialog = document.createElement("dialog");
  const closeBtn = createButton("x", "button", "new-book-dialog-close-btn");
  setAttributes(closeBtn, [
    ["aria-label", "Close"],
    ["title", "Close"],
  ]); // For better accessibility
  formDialog.appendChild(
    document.createElement("div").appendChild(closeBtn).parentElement
  );
  closeBtn.addEventListener("click", () =>
    document.querySelector("dialog").close()
  );
  addNewBookFormToDOM(formDialog, libraryArr); // Add new-book form to the dialog
  document.body.appendChild(formDialog);
}

export {
  LOCAL_STORAGE_KEY,
  addBookToDOM,
  addNewBookFormToDOM,
  addNewBookDialogToDOM,
};
