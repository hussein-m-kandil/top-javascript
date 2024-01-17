const myLibrary = [];
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

// Test the library with some dummy books
myLibrary.push(
  new Book("Murder On The Orient Express", "Agatha Christie", "256")
);
myLibrary.push(new Book("Death on the Nile", "Agatha Christie", "288"));
console.table(myLibrary);
myLibrary.forEach((book) => {
  if (book.id === "1") book.setReadState(true);
});
console.table(myLibrary);

// MAIN FUNCTIONS

function addBookToLibrary() {}

function addBookToDOM(book) {
  // Create card elements
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookNumPages = document.createElement("p");
  const bookReadState = document.createElement("p");
  const bookReadStateBtn = document.createElement("button");
  const bookDeleteBtn = document.createElement("button");
  // Add text content to card elements
  bookTitle.appendChild(document.createTextNode(`Title: ${book.title}`));
  bookAuthor.appendChild(document.createTextNode(`Author: ${book.author}`));
  bookNumPages.appendChild(
    document.createTextNode(`Number of Pages: ${book.numOfPages}`)
  );
  bookReadState.appendChild(
    document.createTextNode(
      `Read State: ${
        book.readState ? "Read!" : "Not Read!" // TODO: make constants
      }`
    )
  );
  bookReadStateBtn.appendChild(
    document.createTextNode("Mark as " + (book.readState ? "not read" : "read"))
  );
  bookDeleteBtn.appendChild(document.createTextNode("Delete"));
  // Add id value to card buttons
  bookReadStateBtn.value = book.id;
  bookDeleteBtn.value = book.id;
  // Add event listeners to card buttons
  bookReadStateBtn.addEventListener("click", (event) => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === event.target.value) {
        myLibrary[i].setReadState(!myLibrary[i].readState);
        event.target.textContent =
          "Mark as " + (myLibrary[i].readState ? "not read" : "read");
        break;
      }
    }
    if (event.bubbles) event.stopPropagation();
  });
  bookDeleteBtn.addEventListener("click", (event) => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === event.target.value) {
        myLibrary.splice(i, 1);
        event.target.parentElement.remove();
        break;
      }
    }
    if (event.bubbles) event.stopPropagation();
  });
  // Append card children to the card parent
  bookCard.append(
    bookTitle,
    bookAuthor,
    bookNumPages,
    bookReadState,
    bookReadStateBtn,
    bookDeleteBtn
  );
  // Append the book card to the document
  document.body.appendChild(bookCard);
}

function addNewBookFormToDOM(parentNode) {
  const newBookForm = document.createElement("form");
  const [titleLabel, titleInput] = createLabelAndInput(
    "Title: ",
    [["for", "title"]],
    [
      ["type", "text"],
      ["id", "title"],
      ["name", "title"],
      ["required", ""],
    ]
  );
  newBookForm.appendChild(titleLabel);
  newBookForm.appendChild(titleInput);
  const [authorLabel, authorInput] = createLabelAndInput(
    "Author: ",
    [["for", "author"]],
    [
      ["type", "text"],
      ["id", "author"],
      ["name", "author"],
      ["required", ""],
    ]
  );
  newBookForm.appendChild(authorLabel);
  newBookForm.appendChild(authorInput);
  const [pagesNumLabel, pagesNumInput] = createLabelAndInput(
    "Number of Pages: ",
    [["for", "pages-number"]],
    [
      ["type", "tel"],
      ["id", "pages-number"],
      ["name", "pages-number"],
      ["required", ""],
    ]
  );
  newBookForm.appendChild(pagesNumLabel);
  newBookForm.appendChild(pagesNumInput);
  const [readStateLabel, readStateInput] = createLabelAndInput(
    " Did you read this book?",
    [["for", "read-state"]],
    [
      ["type", "checkbox"],
      ["id", "read-state"],
      ["name", "read-state"],
      ["required", ""],
    ]
  );
  newBookForm.appendChild(readStateInput);
  newBookForm.appendChild(readStateLabel);
  parentNode?.appendChild(newBookForm);
}

function addNewBookFormBtnToDOM() {
  const newBookFormBtn = document.createElement("button");
  setAttributes(newBookFormBtn, [
    ["type", "button"],
    ["value", ""],
  ]);
  newBookFormBtn.appendChild(document.createTextNode("Add New Book"));
  newBookFormBtn.addEventListener("click", (event) => {
    if (!event.target.value) {
      // Add new book form after this button
      addNewBookFormToDOM(event.target.parentElement);
      event.target.value = "shown";
    } else {
      event.target.parentElement
        .querySelectorAll("form")
        ?.forEach((form) => form.remove());
      event.target.value = "";
    }
    if (event.bubbles) event.stopPropagation();
  });
  const newBookFormDiv = document.createElement("div");
  newBookFormDiv.setAttribute("class", "new-book-form-btn");
  newBookFormDiv.appendChild(newBookFormBtn);
  document.body.appendChild(newBookFormDiv);
}

// MAIN CODE

// Add new book form 'button' to the DOM
addNewBookFormBtnToDOM();
// Add book to the DOM
myLibrary.forEach((book) => addBookToDOM(book));

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
