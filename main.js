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

    return { getLibrary, addBookToLibrary };
}

/*
** A book rappresent one slot of the library
** A book is formed by 5 attributes 
*/
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
    
    /* The method switch the current read status */
    const toggleReadStatus = () => {
        if (readStatus === "is-read") {
            readStatus = "not-read"
        }
        else {
            readStatus = "is-read";
        }
    };

    return { getTitle, getAuthor, getPages, getSummary, getReadStatus,
            setTitle, setAuthor, setPages, setSummary, setReadStatus,
            toggleReadStatus };
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
            pagesCell.setAttribute("class", "pages");
            pagesCell.textContent = book.getPages();
            const readStatusCell = document.createElement("td");
            readStatusCell.setAttribute("class", "button-cell");
            const readToggleButton = document.createElement("button");
            readToggleButton.setAttribute("id", `${library.indexOf(book)}`);
            readToggleButton.textContent = book.getReadStatus();
            const deleteCell = document.createElement("td");
            deleteCell.setAttribute("class", "button-cell");
            const deleteBookButton = document.createElement("button");
            deleteBookButton.setAttribute("class", "delete");
            deleteBookButton.textContent = "delete";
            deleteBookButton.setAttribute("id", `${library.indexOf(book)}`);
            tableRow.appendChild(titleCell);
            tableRow.appendChild(authorCell);
            tableRow.appendChild(pagesCell);
            tableRow.appendChild(readStatusCell);
            readStatusCell.appendChild(readToggleButton);
            tableRow.appendChild(deleteCell);
            deleteCell.appendChild(deleteBookButton);
            readToggleButton.addEventListener("click", toggleReadStatusHandler);
            deleteBookButton.addEventListener("click", deleteBookHandler);
        }
    }

    function toggleReadStatusHandler(e) {
        myLibrary.getLibrary()[e.target.getAttribute("id")].toggleReadStatus();
        e.target.textContent = myLibrary.getLibrary()[e.target.getAttribute("id")].getReadStatus();
    }

    function deleteBookHandler(e) {
        myLibrary.getLibrary().splice(e.target.getAttribute("id"), 1);
        e.target.parentNode.parentNode.remove();
    }

    function addBookHandler(event) {
        event.preventDefault();
        /* Initialize what's need for the book creation */
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
        /* create the book */
        const newBook = book();
        newBook.setTitle(title.value);
        newBook.setAuthor(author.value);
        newBook.setPages(pages.value);
        newBook.setSummary(summary.value);
        newBook.setReadStatus(readStatus.value);
        /* add the book to the library */
        myLibrary.addBookToLibrary(newBook);
        /* refresh what's rendered */
        screenUpdate();
    }

   addButton.addEventListener("click", addBookHandler);

   screenUpdate();
}

screenManager();
