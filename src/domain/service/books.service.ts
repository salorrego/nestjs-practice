import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookModel } from '../../data-access/books/book.model';
import { BooksRepository } from '../../data-access/books/books.repository';
import { Logger } from '../../utils/logger';
import { CreateBookRequest } from '../entities/create-book-request';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async getAllBooks(): Promise<BookModel[]> {
    try {
      Logger.debug('BooksService: About to get all books');
      return await this.booksRepository.findAll();
    } catch (error) {
      Logger.error(
        `BooksService: Something went wrong while getting all books, error ${error.message}, stack ${error.stack}`,
      );
      throw new HttpException(
        'Something went wrong while getting all books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBook(book: CreateBookRequest): Promise<BookModel> {
    if (book.quantity < book.totalAvailable) {
      throw new HttpException(
        'totalAvailable cannot be greater than quantity',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      Logger.debug(`BooksService: About to create new book ${book.name}`);
      const bookToSave = new BookModel();
      bookToSave.name = book.name;
      bookToSave.author = book.author;
      bookToSave.genre = book.genre;
      bookToSave.quantity = book.quantity;
      bookToSave.totalAvailable = book.totalAvailable;

      return await this.booksRepository.saveBook(bookToSave);
    } catch (error) {
      Logger.error(
        `BooksService: Something went wrong while saving book ${book.name}, error ${error.message}, stack ${error.stack}`,
      );
      throw new HttpException(
        'Something went wrong while saving...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
