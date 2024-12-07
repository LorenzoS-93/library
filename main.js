/* main.js */

/*
** The library rappresent the state of the library
** each slot of the array contain a book 
*/
function library() {
    const myLibrary = [];

    /* getter method */
    const getLibrary = () => myLibrary;

    /*
    ** This method add a book to the library
    ** Future adds, a function that search for the added book and only add new ones
    */
    const addBookToLibrary = (book) => {
        myLibrary.push(book);
    };


    return {getLibrary, addBookToLibrary};
}

function book() {
    let title, author, pages, summary, readStatus;

    /* getter methods */
    const getTitle = () => title;
    const getAuthor = () => author;
    const getPages = () => pages;
    const getSummary = () => summary;
    const getReadStatus = () => readStatus;

    /* setter methods */
    const setTitle = (t) => title = t;
    const setAuthor = (a) => author = a;
    const setPages = (p) => pages = p;
    const setSummary = (s) => summary = s;
    const setReadStatus = (r) => readStatus = r;

    /* print debug function */
    function getValue() { 
        return `Title: ${title}, Author: ${author}, Pages: ${pages}`;
    }

    return {getTitle, getAuthor, getPages, getSummary, getReadStatus,
            setTitle, setAuthor, setPages, setSummary, setReadStatus,
            getValue};
}

function screenManager() {
    /* Initialize the main DOM element that will be needed for adding books to the library */
    const main = document.querySelector("main");
    const addButton = document.querySelector("#add-book");
    const form = document.querySelector(".book-form");
    const table = document.querySelector("table");

    const myLibrary = library();

    /* This pattern update the library with each added book */
    function screenUpdate() {
        /* Clean what's on screen */
        form.reset();
        while(table.children.length > 1) {
            table.removeChild(table.lastChild);
        }
        const library = myLibrary.getLibrary();
        /*
        ** Initialize the table
        ** For each book in the library
        ** Add a row to the table
        ** Add the book in the row 
        */
        for(const book of library) {
            const tableRow = document.createElement("tr");
            table.appendChild(tableRow);
            const titleCell = document.createElement("td");
            titleCell.setAttribute("scope", "row");
            titleCell.textContent = book.getTitle();
            const authorCell = document.createElement("td");
            authorCell.textContent = book.getAuthor();
            const pagesCell = document.createElement("td");
            pagesCell.textContent = book.getPages();
            const readStatusCell = document.createElement("td");
            readStatusCell.textContent = book.getReadStatus();
            tableRow.appendChild(titleCell);
            tableRow.appendChild(authorCell);
            tableRow.appendChild(pagesCell);
            tableRow.appendChild(readStatusCell);
        }
    }

    function addBook(event) {
        event.preventDefault();

        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const summary = document.querySelector("#summary");
        const readStatus = document.querySelector("#read");
        if(!readStatus.checked) {
            readStatus.value = "not-read";
        }
        else {
            readStatus.value = "is-read";
        }
        const newBook = book();
        newBook.setTitle(title.value);
        newBook.setAuthor(author.value);
        newBook.setPages(pages.value);
        newBook.setSummary(summary.value);
        newBook.setReadStatus(readStatus.value);
        myLibrary.addBookToLibrary(newBook);
        screenUpdate();
    }

   addButton.addEventListener("click", addBook);

   screenUpdate();
}

screenManager();
// const openDialogBtn = document.querySelector("#open-dialog");
// const dialog = document.querySelector("dialog");
// const closeDialogBtn = document.querySelector("#close-dialog");
// const addBookBtn = document.querySelector("#add-book");

// /* Initialize  myLibrary array */
// const myLibrary = [];

// /* Initialize Book contructor */
// function Book(title, author, pages, summary, read) {
//     this.title=title;
//     this.author=author;
//     this.pages=pages;
//     this.summary=summary;
//     this.read=read;
// }

// const addBookToLibrary = () => {
//     const titleInput = document.querySelector("#title");
//     const authorInput = document.querySelector("#author");
//     const pagesInput = document.querySelector("#pages");
//     const summaryInput = document.querySelector("#summary")
//     let read;
//     if(titleInput.value !== "" && authorInput.value !== "" && pagesInput.value !== "") {
//         if(document.querySelector("#read").checked) {
//             read = "read";
//         }
//         else {
//             read = "not-read"
//         }
//         const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, summaryInput.value, read);
//         myLibrary.push(newBook);
//     }
// };

// const addCover = (e) => {
//     const bookCover = document.createElement("div");
//     bookCover.setAttribute("class", "image-placeholder");

//     bookCover.textContent = "img";

//     e.appendChild(bookCover);
// };

// const addAttributes = (e, b) => {
//     const bookAttributes = document.createElement("div");
//     bookAttributes.setAttribute("class", "attributes");
//     fillAttributes(bookAttributes, b);
//     e.appendChild(bookAttributes);
// };

// const fillAttributes = (e, b) => {
//     addTitle(e, b);
//     addAuthor(e, b);
//     addPages(e, b);
// };

// const addTitle = (e, b) => {
//     const bookTitle = document.createElement("p");
//     bookTitle.setAttribute("class", "title");

//     bookTitle.innerHTML = `<b>Title:</b> ${b.title}`;
//     e.appendChild(bookTitle);
// };

// const addAuthor = (e, b) => {
//     const bookAuthor = document.createElement("p");
//     bookAuthor.setAttribute("class", "author");

//     bookAuthor.innerHTML = `<b>Author:</b> ${b.author}`;
//     e.appendChild(bookAuthor);
// };

// const addPages = (e, b) => {
//     const bookPages = document.createElement("p");
//     bookPages.setAttribute("class", "pages");

//     bookPages.innerHTML = `<b>Pages:</b> ${b.pages}`;
//     e.appendChild(bookPages);
// };

// const addSummary = (e, b) => {
//     const bookSummary = document.createElement("p");
//     bookSummary.setAttribute("class", "summary");

//     bookSummary.innerHTML = `<b>Summary:</b> ${b.summary}`;
//     e.appendChild(bookSummary);
// };

// const addReadBtn = (e, b) => {
//     const readToggleBtn = document.createElement("button");
//     readToggleBtn.setAttribute("class", "readToggleBtn");
//     readToggleBtn.setAttribute("id", myLibrary.indexOf(b));
//     if(b.read !== "read") {
//         readToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                     <title>book</title>
//                                     <path d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
//                                     </svg>`;
//     }
//     else {
//         readToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                     <title>book-check</title>
//                                     <path d="M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M6 22C4.89 22 4 21.1 4
//                                      20V4C4 2.89 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.34C19.37 13.12 18.7 
//                                      13 18 13C14.69 13 12 15.69 12 19C12 20.09 12.29 21.12 12.8 22H6Z" />
//                                     </svg>`
//     }
    
//     readToggleBtn.addEventListener("click", toggleReadStatus);
//     e.appendChild(readToggleBtn);
// };

// function toggleReadStatus() {
//     if(myLibrary[this.getAttribute("id")].read === "read") {
//         myLibrary[this.getAttribute("id")].read = "not-read";
//     }
//     else {
//         myLibrary[this.getAttribute("id")].read = "read";
//     }
//     showLibrary();
// }

// const addDltBtn = (e, b) => {
//     const deleteBookBtn = document.createElement("button");
//     deleteBookBtn.setAttribute("class", "deleteBookBtn");
//     deleteBookBtn.setAttribute("id", myLibrary.indexOf(b));
//     deleteBookBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                 <title>delete</title>
//                                 <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
//                                 </svg>`;
//     deleteBookBtn.addEventListener("click", removeBook);
//     e.appendChild(deleteBookBtn);
// };

// function removeBook() {
//     myLibrary.splice(this.getAttribute("id"), 1);
//     this.parentNode.parentNode.remove();
// }

// const fillBtnRow = (e, b) => {
//     addReadBtn(e, b);
//     addDltBtn(e, b);
// };

// const addBtnRow = (e, b) => {
//     const btnRow = document.createElement("div");
//     btnRow.setAttribute("class", "btnRow");
//     fillBtnRow(btnRow, b);
//     e.appendChild(btnRow);
// };

// const fillCard = (e, b) => {
//     addCover(e);
//     addAttributes(e, b);
//     addSummary(e, b);
//     addBtnRow(e, b);
// };

// const addCard = (e, b) => {
//     const newCard = document.createElement("div");
//     newCard.setAttribute("class", "card");
//     fillCard(newCard, b);
//     e.insertBefore(newCard, openDialogBtn);
// };

// const showLibrary = () => {
//     const main = document.querySelector("main");
//     refreshLibrary(main);
//     for(const book of myLibrary) {
//         addCard(main, book);
//     }
// };

// const refreshLibrary = (e) => {
//     while (e.children.length > 1) {
//         e.removeChild(e.firstChild);
//     }
// };

// const openDialog = () => {
//     const form = document.querySelector("form");
//     form.reset();
//     dialog.showModal();
// };

// const closeDialog = (event) => {
//     event.preventDefault();
//     dialog.close();
// };

// const addBook = (event) => {
//     event.preventDefault();

//     addBookToLibrary();
//     showLibrary();
    
//     dialog.close();
// };

// openDialogBtn.addEventListener("click", openDialog);
// closeDialogBtn.addEventListener("click", closeDialog);
// addBookBtn.addEventListener("click", addBook);
