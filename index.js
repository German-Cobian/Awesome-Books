// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// Display Constructor
function Display() {}

// Add Book To List
Display.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const bookItem = document.createElement('div');
  bookItem.id = `${book.id}`;
  // Insert columns
  bookItem.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.isbn}</p>
    <button><a href="#" class="delete">Remove</a></button>
  `;
  list.appendChild(bookItem);
}

// Delete Book
Display.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
Display.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate Display
  const display = new Display();
  // Add book to list
  display.addBookToList(book);
  // add to local storage
  addBook(book);
  // Clear fields
  display.clearFields();
  e.preventDefault();
});