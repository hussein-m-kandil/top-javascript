const myLibrary = [];
let bookCount = myLibrary.length;

// the constructor
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
  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookNumPages.textContent = `Number of Pages: ${book.numOfPages}`;
  bookReadState.textContent = `Read State: ${
    book.readState ? "Read!" : "Not Read!" // TODO: make constants
  }`;
  bookReadStateBtn.textContent =
    "Mark as " + (book.readState ? "not read" : "read");
  bookDeleteBtn.textContent = "Delete";
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

// Add book to the DOM
myLibrary.forEach((book) => addBookToDOM(book));
