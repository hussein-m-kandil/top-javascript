const myLibrary = [];
let newLibrary = true;
if (localStorage) {
  const odinLibraryBooks = localStorage.getItem("odin-library-books");
  if (odinLibraryBooks) {
    newLibrary = false;
    myLibrary.push(...JSON.parse(odinLibraryBooks));
  }
}
let bookCount = myLibrary.length;

// Book constructor
function Book(title, author, numOfPages, readState) {
  if (!(this instanceof Book)) {
    throw Error(
      "Invalid invocation \n" +
        "\nOnly constructor invocation allowed; " +
        "invoke 'Book' using 'new'.\n"
    );
  }

  this.id = String(++bookCount);
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readState = Boolean(readState);
}

Book.prototype.setReadState = function (readState) {
  this.readState = readState;
};

// Fill the library with some dummy books if not localStorage
if (newLibrary || myLibrary.length < 1) {
  myLibrary.push(
    new Book("Murder On The Orient Express", "Agatha Christie", "256")
  );
  myLibrary.push(new Book("Death on the Nile", "Agatha Christie", "288", true));
} else {
  // Add Book prototype to the book that come from localStorage
  myLibrary.forEach((book) => Object.setPrototypeOf(book, Book.prototype));
}

// MAIN FUNCTIONS

function addBookToLibrary() {}

function addBookToDOM(book, booksContainer) {
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
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === bookId) {
        myLibrary[i].setReadState(!myLibrary[i].readState);
        if (myLibrary[i].readState) {
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
    if (localStorage) {
      localStorage.setItem("odin-library-books", JSON.stringify(myLibrary));
    }
  });
  const bookDeleteBtn = createButton(
    "Delete",
    "button",
    "danger-text danger-border",
    "book-card-del-btn-" + book.id,
    book.id
  );
  bookDeleteBtn.addEventListener("click", (event) => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === event.target.value) {
        myLibrary.splice(i, 1);
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
    if (localStorage) {
      localStorage.setItem("odin-library-books", JSON.stringify(myLibrary));
    }
  });
  bookCardButtons.append(bookReadStateBtn, bookDeleteBtn);
  bookCard.append(bookTitle, bookCardBody, bookCardButtons);
  booksContainer.insertBefore(bookCard, booksContainer.firstChild);
}

function addNewBookFormToDOM(parentNode) {
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
    const formData = Object.fromEntries(new FormData(event.target).entries());
    const newBook = new Book(
      formData["title"],
      formData["author"],
      formData["pages-number"],
      Boolean(formData["read-state"])
    );
    myLibrary.unshift(newBook);
    if (localStorage) {
      localStorage.setItem("odin-library-books", JSON.stringify(myLibrary));
    }
    addBookToDOM(newBook, document.querySelector(".books-container"));
    event.target.querySelectorAll("input").forEach((input) => {
      input.value = "";
      if (input.type === "checkbox") input.checked = false;
    });
    document.querySelector("dialog")?.close(); // Close the dialog if any
  });
}

function addNewBookDialogToDOM() {
  // Button to show the dialog
  const newBookBtn = createButton("➕", "button", "new-book-dialog-show-btn");
  newBookBtn.addEventListener("click", (event) => {
    document.querySelector("dialog").showModal();
  });
  document.body.appendChild(
    document.createElement("div").appendChild(newBookBtn).parentElement
  );
  // New book dialog
  const formDialog = document.createElement("dialog");
  const closeBtn = createButton("✖️", "button", "new-book-dialog-close-btn");
  formDialog.appendChild(
    document.createElement("div").appendChild(closeBtn).parentElement
  );
  closeBtn.addEventListener("click", () =>
    document.querySelector("dialog").close()
  );
  addNewBookFormToDOM(formDialog); // Add new-book form to the dialog
  document.body.appendChild(formDialog);
}

// HELPER FUNCTIONS

function setAttributes(element, attrs) {
  /*
   * Set multiple attributes on element (mutate the element) at once
   *
   * @param element: HTMLElement
   * * HTML Element to set attributes on
   * @param attrs: Array[Array[String, String],...];
   * * Attributes with its values as a list of string pairs
   *
   * @return: undefined
   */
  if (element && element.setAttribute) {
    if (attrs && Array.isArray(attrs)) {
      for (let i = 0; i < attrs.length; i++) {
        if (Array.isArray(attrs) && attrs[i].length === 2) {
          element.setAttribute(attrs[i][0], attrs[i][1]);
        }
      }
    }
  }
}

function createLabelAndInput(labelText, labelAttrs, inputAttrs) {
  /*
   * Create input with its label
   *
   * NOTE: All parameters (@params) are optional
   *
   * @param labelText: String;
   * * Text for the label
   * @param labelAttrs: Array[Array[String, String],...];
   * * Attributes with its values for the label as a list of string pairs
   * @param inputAttrs: Array[Array[String, String],...];
   * * Attributes with its values for the input as a list of string pairs
   *
   * @return: Array[HTMLLabelElement, HTMLInputElement]
   */
  const labelElement = document.createElement("label");
  if (labelText && typeof labelText === "string") {
    labelElement.appendChild(document.createTextNode(labelText));
  }
  setAttributes(labelElement, labelAttrs);
  const inputElement = document.createElement("input");
  setAttributes(inputElement, inputAttrs);
  return [labelElement, inputElement];
}

function createSpan(spanText, className) {
  const newSpan = document.createElement("span");
  newSpan.className = className ?? "";
  newSpan.appendChild(document.createTextNode(spanText ?? ""));
  return newSpan;
}

function createBookCardBodyEntry(entryTitle, entryData) {
  const bookCardEntry = document.createElement("div");
  bookCardEntry.className = "book-card-entry";
  bookCardEntry.appendChild(
    createSpan(entryTitle + ": ", "book-card-entry-title")
  );
  bookCardEntry.appendChild(createSpan(entryData, "book-card-entry-data"));
  return bookCardEntry;
}

function readStateToggler(
  togglerBtn,
  togglerText,
  fromTogglerClass,
  toTogglerClass,
  readStateElement,
  readStateElementText,
  fromReadStateTextClass,
  toReadStateTextClass
) {
  togglerBtn.textContent = togglerText;
  togglerBtn.classList.replace(fromTogglerClass, toTogglerClass);
  togglerBtn.classList.replace(toReadStateTextClass, fromReadStateTextClass);
  readStateElement.textContent = readStateElementText;
  readStateElement.classList.replace(
    fromReadStateTextClass,
    toReadStateTextClass
  );
}

function createButton(textContent, type, classesAsSpaceSepStr, id, value) {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(textContent));
  button.setAttribute("type", type);
  button.className = classesAsSpaceSepStr ?? "";
  button.id = id ?? "";
  button.value = value ?? "";
  return button;
}

// MAIN CODE

// Add header
document.body.appendChild(
  document
    .createElement("h1")
    .appendChild(document.createTextNode("Odin Library")).parentElement
);
// Add new-book form' to the DOM
if (!window.HTMLDialogElement) {
  addNewBookFormToDOM(document.body); // Only if no modal support
} else {
  // If modal support create new-book button and modal, then add form to modal
  addNewBookDialogToDOM();
}
// Create and add books container
const booksContainer = document.createElement("div");
booksContainer.className = "books-container";
document.body.appendChild(booksContainer);
// Add book to the DOM
for (i = myLibrary.length - 1; i >= 0; i--) {
  addBookToDOM(myLibrary[i], booksContainer);
}
