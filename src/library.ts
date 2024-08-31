// Book interface to represent a book object
interface Book {
    isbn: string;
    title: string;
    author: string;
    publicationYear: number;
    isAvailable: boolean;
}

export class Library {
    private books: Map<string, Book>;

    constructor() {
        this.books = new Map();
    }

    // Add a new book to the library
    addBook(isbn: string, title: string, author: string, publicationYear: number): void {
        if (this.books.has(isbn)) {
            throw new Error('Book with this ISBN already exists.');
        }

        const newBook: Book = {
            isbn,
            title,
            author,
            publicationYear,
            isAvailable: true,
        };
        this.books.set(isbn, newBook);
    }

    borrowBook(isbn: string): void {
        const book = this.books.get(isbn);

        if (!book) {
            throw new Error('Book not found.');
        }

        if (!book.isAvailable) {
            throw new Error('Book is currently not available.');
        }

        book.isAvailable = false;

    }

    returnBook(isbn: string): void {
        const book = this.books.get(isbn);
    
        if (!book) {
          throw new Error('Book not found.');
        }
    
        if (book.isAvailable) {
          throw new Error('Book is not borrowed.');
        }
      }
    
    viewAvailableBooks(): Book[] {
        return Array.from(this.books.values()).filter(book => book.isAvailable);
    }
}