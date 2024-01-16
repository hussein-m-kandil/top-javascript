const myLibrary = [];

// the constructor
function Book(id, title, author, numOfPages, read) {
  if (!(this instanceof Book)) {
    throw Error(
      "Invalid invocation \n" +
        "\nOnly constructor invocation allowed; " +
        "invoke 'Book' using 'new'.\n"
    );
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}

Book.prototype.isRead = function (read) {
  this.read = read;
};

// Add some dummy books to the myLibrary
myLibrary.push(
  new Book(
    String(myLibrary.length + 1),
    "Murder On The Orient Express",
    "Agatha Christie",
    "256",
    false
  )
);
myLibrary.push(
  new Book(
    String(myLibrary.length + 1),
    "Death on the Nile",
    "Agatha Christie",
    "288",
    false
  )
);
console.table(myLibrary);
myLibrary.forEach((book) => {
  if (book.id === "1") book.isRead(true);
});
console.table(myLibrary);

// Add new book to the DOM & myLibrary
function addBookToLibrary() {}
