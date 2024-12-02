// /* main.js */

const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector("#open-dialog");
const closeDialogBtn = document.querySelector("#close-dialog");
const addBookBtn = document.querySelector("#add-book");
const main = document.querySelector("main");
const titleInput = dialog.querySelector("#title");
const authorInput = dialog.querySelector("#author");
const pagesInput = dialog.querySelector("#pages");

/* Initialize  myLibrary array */
const myLibrary = [];

/* Initialize Book contructor */
function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

const openDialog = () => {
    console.log("click");
    dialog.showModal();
};

const closeDialog = (event) => {
    event.preventDefault();
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
    dialog.close();
};

const addCard = () => {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    main.insertBefore(newCard, openDialogBtn);

    return newCard;
};

const addBookToLibrary = () => {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, "read");
    myLibrary.push(newBook);

    return newBook;
};

const addCover = (e) => {
    const bookCover = document.createElement("div");
    bookCover.setAttribute("class", "image-placeholder");

    bookCover.textContent = "img";

    e.appendChild(bookCover);
};

const addAttributes = (e) => {
    const bookAttributes = document.createElement("div");
    bookAttributes.setAttribute("class", "attributes");
    
    e.appendChild(bookAttributes);

    return bookAttributes;
};

const fillAttributes = (e, b) => {
    addTitle(e, b);
    addAuthor(e, b);
    addPages(e, b);
};

const addTitle = (e, b) => {
    const bookTitle = document.createElement("p");
    bookTitle.setAttribute("class", "title");

    bookTitle.textContent = "Title: " + b.title;
    e.appendChild(bookTitle);
};

const addAuthor = (e, b) => {
    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "author");

    bookAuthor.textContent = "Author: " + b.author;
    e.appendChild(bookAuthor);
};

const addPages = (e, b) => {
    const bookPages = document.createElement("p");
    bookPages.setAttribute("class", "pages");

    bookPages.textContent = "Pages: " + b.pages;
    e.appendChild(bookPages);
};

const addSummary = (e, b) => {
    const bookSummary = document.createElement("p");
    bookSummary.setAttribute("class", "summary");

    bookSummary.textContent = "Summary: ";
    e.appendChild(bookSummary);
}

const addDltBtn = (e, b) => {
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.setAttribute("id", myLibrary.indexOf(b));
    deleteBookBtn.textContent = "delete";
    e.appendChild(deleteBookBtn);

    return deleteBookBtn;
};

function removeBook() {
    myLibrary.splice(this.getAttribute("id"), 1);
    this.parentNode.remove();
}

const fillCard = (e, b) => {
    addCover(e);
    const attributes = addAttributes(e);
    fillAttributes(attributes, b);
    addSummary(e, b);
    const deleteBookBtn = addDltBtn(e, b);
    deleteBookBtn.addEventListener("click", removeBook);

};

const addBook = (event) => {
    event.preventDefault();
    
    const newBook = addBookToLibrary();
    const newCard = addCard();
    fillCard(newCard, newBook);
    
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
    
    dialog.close();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
addBookBtn.addEventListener("click", addBook);
