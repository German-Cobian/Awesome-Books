/* eslint max-classes-per-file: ["error", 5] */

// Book Constructor

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Display class
class Display {
// Add Book To List
  static addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const bookItem = document.createElement('li');
    bookItem.className = 'alternate d-flex justify-content-between';
    bookItem.id = `${book.id}`;
    // Insert columns
    bookItem.innerHTML = `
    <p class="col-4 pt-3">${book.title}</p>
    <p class="col-4 pt-3">${book.author}</p>
    <p class="col-1 pt-3">${book.isbn}</p>
    <button class="col-2 my-1 mr-3"><a href="#" class="delete text-dark">Remove</a></button>
    `;
    list.appendChild(bookItem);
  }

  // Delete Book
  static deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
    }
  }

  // Clear Fields
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Class local storage

class MylocalStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  // Display books in local storage
  static displayBooks() {
    const books = MylocalStorage.getBooks();
    books.forEach((book) => {
      // Add book to Display
      Display.addBookToList(book);
    });
  }

  // Add books to local storage
  static addBook(book) {
    const books = MylocalStorage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove books from local storage
  static removeBook(isbn) {
    let books = MylocalStorage.getBooks();
    const filteredBooks = books.filter((book) => book.isbn !== isbn);
    books = filteredBooks;
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load Event
document.addEventListener('DOMContentLoaded', MylocalStorage.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
  const books = MylocalStorage.getBooks();
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  // Instantiate book
  const book = new Book(title, author, isbn);

  if (books.find((x) => x.isbn === isbn)) {
    alert('Please write another isbn');
  } else {
    // Add book to list
    Display.addBookToList(book);
    // add to local storage
    MylocalStorage.addBook(book);
    // Clear fields
    Display.clearFields();
    e.preventDefault();
  }
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
  // Delete book
  Display.deleteBook(e.target);

  // Remove from localStorage
  MylocalStorage.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
