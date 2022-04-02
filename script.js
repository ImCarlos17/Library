const screenLibrary = document.querySelector(".container-right");
const myForm = document.querySelector(".form");

const storageBook = localStorage.getItem("book");
const myLibrary = storageBook ? JSON.parse(storageBook) : [];

function Book(title, author, page, read) {
  (this.title = title),
    (this.author = author),
    (this.page = page),
    (this.read = read);
}

function updateStorage() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function changeBookStatus(element) {
  element.innerText == "read"
    ? (element.style.backgroundColor = "green")
    : (element.style.backgroundColor = "red");
}

function renderBook(book, i) {
  const cardBook = document.createElement("div");
  cardBook.classList.add("card-book");
  cardBook.setAttribute("data-book", `${i}`);
  const headerCard = document.createElement("h3");
  const bodyCard = document.createElement("div");
  bodyCard.classList.add("card-body");
  const titleCard = document.createElement("h4");
  const authorCard = document.createElement("h4");
  const pagesCard = document.createElement("h4");
  const divButtons = document.createElement("div");
  divButtons.classList.add("btns-book");
  const btnRead = document.createElement("button");
  btnRead.classList.add("btn-read");
  btnRead.setAttribute("data-book", `${i}`);
  btnRead.addEventListener("click", changeStatusText);
  const btnRemove = document.createElement("button");
  btnRemove.addEventListener("click", removeBook);
  btnRemove.classList.add("btn-remove");
  btnRemove.setAttribute("data-book", `${i}`);

  headerCard.innerText = "Book";
  titleCard.innerText = `Title: ${book.title}`;
  authorCard.innerText = `Author: ${book.author}`;
  pagesCard.innerText = `Pages: ${book.page}`;
  btnRead.innerText = `${book.read}`;
  btnRemove.innerText = "remove";

  bodyCard.appendChild(headerCard);
  bodyCard.appendChild(titleCard);
  bodyCard.appendChild(authorCard);
  bodyCard.appendChild(pagesCard);

  divButtons.appendChild(btnRead);
  divButtons.appendChild(btnRemove);

  cardBook.appendChild(headerCard);
  cardBook.appendChild(bodyCard);
  cardBook.appendChild(divButtons);

  screenLibrary.appendChild(cardBook);
  changeBookStatus(btnRead);
}

function renderBooks() {
  myLibrary.forEach((actualBook, index) => renderBook(actualBook, index));
}

function updateBookStatus(btnValue, position) {
  myLibrary[position].read = `${btnValue !== "read" ? "read" : "unread"}`;
  updateStorage();
}

function changeStatusText(e) {
  let position = e.target.dataset.book;
  let btnValue = e.target.innerText;

  e.target.textContent = btnValue !== "read" ? "read" : "unread";

  changeBookStatus(e.target);
  updateBookStatus(btnValue, position);
}

function removeBookDom(position) {
  screenLibrary.removeChild(screenLibrary.children[position]);
}

function removeBook(e) {
  let position = e.target.dataset.book;
  myLibrary.splice(position, 1);
  updateStorage();

  removeBookDom(position);
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target.title.value;
  let author = e.target.author.value;
  let pages = e.target.pages.value;
  let readBook = e.target.read.checked ? "read" : "unread";

  const book = new Book(title, author, pages, readBook);
  myForm.reset();

  addBookToLibrary(book);
  updateStorage();
  renderBook(book, myLibrary.length - 1);
});

renderBooks();
