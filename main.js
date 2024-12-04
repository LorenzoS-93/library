/* main.js */

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

const addBookToLibrary = () => {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, "read");
    myLibrary.push(newBook);
};

const addCover = (e) => {
    const bookCover = document.createElement("div");
    bookCover.setAttribute("class", "image-placeholder");

    bookCover.textContent = "img";

    e.appendChild(bookCover);
};

const addAttributes = (e, b) => {
    const bookAttributes = document.createElement("div");
    bookAttributes.setAttribute("class", "attributes");
    fillAttributes(bookAttributes, b);
    e.appendChild(bookAttributes);
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
    readToggleBtn.addEventListener("click", toggleReadStatus);
    e.appendChild(readToggleBtn);
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
    deleteBookBtn.addEventListener("click", removeBook);
    e.appendChild(deleteBookBtn);
};

function removeBook() {
    myLibrary.splice(this.getAttribute("id"), 1);
    this.parentNode.parentNode.remove();
}

const fillBtnRow = (e, b) => {
    addReadBtn(e, b);
    addDltBtn(e, b);
}

const addBtnRow = (e, b) => {
    const btnRow = document.createElement("div");
    btnRow.setAttribute("class", "btnRow");
    fillBtnRow(btnRow, b);
    e.appendChild(btnRow);
};

const fillCard = (e, b) => {
    addCover(e);
    addAttributes(e, b);
    addSummary(e, b);
    addBtnRow(e, b);
};

const addCard = (b) => {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    fillCard(newCard, b);
    main.insertBefore(newCard, openDialogBtn);
};

const showLibrary = () => {
    for(const book of myLibrary) {
        addCard(book);
    }
};

const refreshLibrary = () => {
    while (main.children.length > 1) {
        main.removeChild(main.firstChild);
    }
};

const openDialog = () => {
    form.reset();
    dialog.showModal();
};

const closeDialog = (event) => {
    event.preventDefault();
    dialog.close();
};

const addBook = (event) => {
    event.preventDefault();
    
    addBookToLibrary();
    refreshLibrary();
    showLibrary();
    
    dialog.close();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
addBookBtn.addEventListener("click", addBook);
