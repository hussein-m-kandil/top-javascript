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
  // Book card buttons
  const bookCardButtons = document.createElement("div");
  bookCardButtons.className = "book-card-buttons";
  const bookReadStateBtn = document
    .createElement("button")
    .appendChild(
      document.createTextNode(
        "Mark as " + (book.readState ? "not read" : "read")
      )
    ).parentElement;
  bookReadStateBtn.className = book.readState
    ? "danger-color"
    : "success-color";
  bookReadStateBtn.value = book.id;
  bookReadStateBtn.addEventListener("click", (event) => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === event.target.value) {
        myLibrary[i].setReadState(!myLibrary[i].readState);
        if (myLibrary[i].readState) {
          event.target.textContent = "Mark as not read";
          event.target.classList.remove("success-color");
          event.target.classList.add("danger-color");
        } else {
          event.target.textContent = "Mark as read";
          event.target.classList.remove("danger-color");
          event.target.classList.add("success-color");
        }
        break;
      }
    }
    if (localStorage) {
      localStorage.setItem("odin-library-books", JSON.stringify(myLibrary));
    }
    if (event.bubbles) event.stopPropagation();
  });
  const bookDeleteBtn = document
    .createElement("button")
    .appendChild(document.createTextNode("Delete")).parentElement;
  bookDeleteBtn.className = "danger-color";
  bookDeleteBtn.value = book.id;
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
    if (event.bubbles) event.stopPropagation();
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
  const submitBtn = document.createElement("button");
  setAttributes(submitBtn, [
    ["type", "submit"],
    ["class", "success-color"],
  ]);
  submitBtn.appendChild(document.createTextNode("Add New Book"));
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
  });
}

// function addNewBookFormBtnToDOM() {
//   const newBookFormBtn = document.createElement("button");
//   setAttributes(newBookFormBtn, [
//     ["type", "button"],
//     ["value", ""],
//   ]);
//   newBookFormBtn.appendChild(document.createTextNode("Add New Book"));
//   newBookFormBtn.addEventListener("click", (event) => {
//     if (!event.target.value) {
//       // Add new book form after this button
//       addNewBookFormToDOM(event.target.parentElement);
//       event.target.value = "shown";
//     } else {
//       event.target.parentElement
//         .querySelectorAll(".new-book-form")
//         ?.forEach((form) => form.remove());
//       event.target.value = "";
//     }
//     if (event.bubbles) event.stopPropagation();
//   });
//   const newBookFormDiv = document.createElement("div");
//   newBookFormDiv.className = "new-book-form-btn";
//   newBookFormDiv.appendChild(newBookFormBtn);
//   document.body.appendChild(newBookFormDiv);
// }

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

// MAIN CODE

// Add header
document.body.appendChild(
  document
    .createElement("h1")
    .appendChild(document.createTextNode("Odin Library")).parentElement
);
// Add new book form 'button' to the DOM
addNewBookFormToDOM(document.body);
// Create and add books container
const booksContainer = document.createElement("div");
booksContainer.className = "books-container";
document.body.appendChild(booksContainer);
// Add book to the DOM
for (i = myLibrary.length - 1; i >= 0; i--) {
  addBookToDOM(myLibrary[i], booksContainer);
}
