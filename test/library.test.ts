import { Library } from '../src/library';

describe('Library Management System', () => {
  let library: Library;

  beforeEach(() => {
    library = new Library();
  });

  // Test for adding books
  describe('addBook', () => {
    it('should add a new book to the library', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      expect(library.viewAvailableBooks()).toEqual([
        {
          isbn: '1234',
          title: 'Test Book',
          author: 'Author A',
          publicationYear: 2020,
          isAvailable: true,
        },
      ]);
    });
    it('should not allow adding a book with a duplicate ISBN', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      expect(() => library.addBook('1234', 'Another Book', 'Author B', 2021)).toThrow(
        'Book with this ISBN already exists.'
      );
    });
  });
  // Test for borrowing books
  describe('borrowBook', () => {
    it('should throw an error if the book does not exist', () => {
      expect(() => library.borrowBook('5000')).toThrow('Book not found.');
    });

    it('should borrow an available book', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      library.borrowBook('1234');
      expect(library.viewAvailableBooks()).toEqual([]);
    });

    it('should not allow borrowing a book that is not available', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      library.borrowBook('1234');
      expect(() => library.borrowBook('1234')).toThrow('Book is currently not available.');
    });
  });
  // Test for returning books
  describe('returnBook', () => {
    it('should return a borrowed book', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      library.borrowBook('1234');
      library.returnBook('1234');
      expect(library.viewAvailableBooks()).toEqual([
        {
          isbn: '1234',
          title: 'Test Book',
          author: 'Author A',
          publicationYear: 2020,
          isAvailable: true,
        },
      ]);
    });

    it('should not allow returning a book that is not borrowed', () => {
      library.addBook('1234', 'Test Book', 'Author A', 2020);
      expect(() => library.returnBook('1234')).toThrow('Book is not borrowed.');
    });

    it('should throw an error if the book does not exist', () => {
      expect(() => library.returnBook('5678')).toThrow('Book not found.');
    });
  });
  });