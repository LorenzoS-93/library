/* main.js */

/* Initialize DOM element */
const tbody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

/* Initialize  myLibrary array */
const myLibrary = [];

/* Initialize Book contructor */
function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function openAddModal() {
    dialog.showModal();
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295", "read");
const book2 = new Book("The Lies of Locke Lamora", "Scott Lynch", "605", "not read");
const book3 = new Book("A Wizard of Earthsea", "Ursula K. Le Guin", "205", "not read");

myLibrary.push(book1,book2,book3);

function addBookToLibrary() {
    if (titleInput.value !== '') {
        let read = 'not read';
        if (readInput.checked)
            read = "read";
        const book = new Book(titleInput.value, authorInput.value, pagesInput.value, read);
        myLibrary.push(book);
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
    }
    dialog.close();
    showBook();
}

function changeReadStatus(book) {
    if(book.read === "read")
        book.read = "not read";
    else
        book.read = "read";
}

function showBook() {
    // Clear the table
    while (tbody.firstChild)
        tbody.removeChild(tbody.lastChild);
    // Loop the array and add each attribute of the books to a cell
    let index = 0;
    for(const e of myLibrary) {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("class", "row");
        for(const att in e) {
            const rowCell = document.createElement("td");
            rowCell.textContent = e[att];
            tableRow.appendChild(rowCell);
        }
        const rowCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.setAttribute("class", index);
        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentNode.parentNode.remove();
            const i = deleteBtn.getAttribute("class");
            myLibrary.splice(i, 1);
        });
        rowCell.appendChild(deleteBtn);
        const readBtn = document.createElement("button");
        readBtn.textContent = "read";
        readBtn.setAttribute("class", index);
        readBtn.addEventListener("click", () => {
            const i = readBtn.getAttribute("class");
            changeReadStatus(myLibrary[i]);
            showBook();
        });
        rowCell.appendChild(readBtn);
        tableRow.appendChild(rowCell);
        tbody.appendChild(tableRow);
        index++;
    }
}

showBook();