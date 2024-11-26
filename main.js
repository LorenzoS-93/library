// /* main.js */

const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector("#open-dialog");
const closeDialogBtn = document.querySelector("#close-dialog");
const addBookBtn = document.querySelector("#add-book");
const main = document.querySelector("main")

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

const closeDialog = () => {
    dialog.close();
};

const addCard = () => {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    main.insertBefore(newCard, openDialogBtn);
}

const addBook = () => {
    addCard();
    dialog.close();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
addBookBtn.addEventListener("click", addBook);

// function addBookToLibrary() {
//     if (titleInput.value !== '') {
//         let read = 'not read';
//         if (readInput.checked)
//             read = "read";
//         const book = new Book(titleInput.value, authorInput.value, pagesInput.value, read);
//         myLibrary.push(book);
//         titleInput.value = '';
//         authorInput.value = '';
//         pagesInput.value = '';
//     }
//     dialog.close();
//     showBook();
// }

// function changeReadStatus(book) {
//     if(book.read === "read")
//         book.read = "not read";
//     else
//         book.read = "read";
// }

// function showBook() {
//     // Clear the table
//     while (tbody.firstChild)
//         tbody.removeChild(tbody.lastChild);
//     // Loop the array and add each attribute of the books to a cell
//     let index = 0;
//     for(const e of myLibrary) {
//         const tableRow = document.createElement("tr");
//         tableRow.setAttribute("class", "row");
//         for(const att in e) {
//             const rowCell = document.createElement("td");
//             rowCell.textContent = e[att];
//             tableRow.appendChild(rowCell);
//         }
//         const rowCell = document.createElement("td");
//         const deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "delete";
//         deleteBtn.setAttribute("class", index);
//         deleteBtn.addEventListener("click", () => {
//             deleteBtn.parentNode.parentNode.remove();
//             const i = deleteBtn.getAttribute("class");
//             myLibrary.splice(i, 1);
//         });
//         rowCell.appendChild(deleteBtn);
//         const readBtn = document.createElement("button");
//         readBtn.textContent = "read";
//         readBtn.setAttribute("class", index);
//         readBtn.addEventListener("click", () => {
//             const i = readBtn.getAttribute("class");
//             changeReadStatus(myLibrary[i]);
//             showBook();
//         });
//         rowCell.appendChild(readBtn);
//         tableRow.appendChild(rowCell);
//         tbody.appendChild(tableRow);
//         index++;
//     }
// }



