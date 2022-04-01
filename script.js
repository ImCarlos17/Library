const screenLibrary = document.querySelector(".container-right");
const myForm = document.querySelector(".form");

const storageBook = localStorage.getItem("book");
const myLibrary = storageBook ? JSON.parse(storageBook) : [];
renderBooks();

function Book(title, author, page, read) {
  (this.title = title),
    (this.author = author),
    (this.page = page),
    (this.read = read);
}

function addBookToStorage() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBook(book);
}

function eventlocalStorage(book) {
  addBookToLibrary(book);
  addBookToStorage();
}

function renderBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    indexBook = myLibrary[i];

    const cardBook = document.createElement("div");
    cardBook.classList.add("card-book");
    cardBook.classList.add(`data-book${i}`);
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
    const btnRemove = document.createElement("button");
    btnRead.classList.add("btn-remove");

    headerCard.innerText = "Book";
    titleCard.innerText = `Title: ${indexBook.title}`;
    authorCard.innerText = `Author: ${indexBook.author}`;
    pagesCard.innerText = `Pages: ${indexBook.page}`;
    btnRead.innerText = `${indexBook.read}`;
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
  }
  statusBook();
}

function renderBook(book) {
  const cardBook = document.createElement("div");
  cardBook.classList.add("card-book");
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
  const btnRemove = document.createElement("button");
  btnRead.classList.add("btn-remove");

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
  statusBook();
}

function statusBook() {
  let buttons = document.querySelectorAll(".btn-read");

  buttons.forEach((btn) => {
    if (btn.innerText == "read") {
      btn.style.backgroundColor = "green";
    } else {
      btn.style.backgroundColor = "red";
    }
  });

  changeStatus();
}

function changeStatus() {
  let buttons = document.querySelectorAll(".btn-read");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.innerText == "read") {
        e.target.innerText = "unread";
        e.target.style.backgroundColor = "red";
      } else {
        e.target.innerText = "read";
        e.target.style.backgroundColor = "green";
      }
    });
  });
}

function removeBook() {}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target.title.value;
  let author = e.target.author.value;
  let pages = e.target.pages.value;
  let readBook = e.target.read.checked ? "read" : "unread";

  const book = new Book(title, author, pages, readBook);
  myForm.reset();

  eventlocalStorage(book);
});
