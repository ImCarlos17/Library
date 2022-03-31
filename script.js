const library = document.querySelector(".container-right");
const myForm = document.querySelector(".form");

const storageBook = localStorage.getItem("book");

const myLibrary = storageBook ? JSON.parse(storageBook) : [];
console.log(myLibrary);

function Book(title, author, page, read) {
  (this.title = title),
    (this.author = author),
    (this.page = page),
    (this.read = read);
}

function addBookToStorage(book) {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function eventlocalStorage(book) {
  addBookToLibrary(book);
  addBookToStorage(book);
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target.title.value;
  let author = e.target.author.value;
  let pages = e.target.pages.value;
  let readBook = e.target.read.checked ? "read" : "unread";

  const book = new Book(title, author, pages, readBook);

  eventlocalStorage(book);
});
