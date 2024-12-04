// /* main.js */

const main = document.querySelector("main");
const openDialogBtn = main.querySelector("#open-dialog");
const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");
const titleInput = form.querySelector("#title");
const authorInput = form.querySelector("#author");
const pagesInput = form.querySelector("#pages");
const closeDialogBtn = form.querySelector("#close-dialog");
const addBookBtn = form.querySelector("#add-book");

const bin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>delete</title>
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>`;

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
    form.reset();
    dialog.showModal();
};

const closeDialog = (event) => {
    event.preventDefault();
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

const addReadBtn = (e, b) => {
    const readToggleBtn = document.createElement("button");
    readToggleBtn.setAttribute("class", "readToggleBtn");
    readToggleBtn.setAttribute("id", myLibrary.indexOf(b));
    readToggleBtn.textContent = "READ";
    e.appendChild(readToggleBtn);

    return readToggleBtn;
};

function toggleReadStatus() {
    console.log(myLibrary[this.getAttribute("id")]);
    if(myLibrary[this.getAttribute("id")].read === "read") {
        myLibrary[this.getAttribute("id")].read = "not read";
    }
    else {
        myLibrary[this.getAttribute("id")].read = "read";
    }
    console.log(myLibrary[this.getAttribute("id")]);
}

const addDltBtn = (e, b) => {
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.setAttribute("class", "deleteBookBtn");
    deleteBookBtn.setAttribute("id", myLibrary.indexOf(b));
    deleteBookBtn.innerHTML = bin;
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
    const readToggleBtn = addReadBtn(e, b);
    readToggleBtn.addEventListener("click", toggleReadStatus);
    const deleteBookBtn = addDltBtn(e, b);
    deleteBookBtn.addEventListener("click", removeBook);

};

const addBook = (event) => {
    event.preventDefault();
    
    const newBook = addBookToLibrary();
    const newCard = addCard();
    fillCard(newCard, newBook);
    
    dialog.close();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
addBookBtn.addEventListener("click", addBook);
