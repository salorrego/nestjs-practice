import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BookModel } from "src/data-access/books/book.model";
import { BooksRepository } from "src/data-access/books/books.repository";
import { Logger } from "src/utils/logger";

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository){}

  async getAllBooks(): Promise<BookModel[]> {
    try {
      Logger.debug('BooksService: About to get all books')
      return await this.booksRepository.findAll();
    } catch (error) {
      throw new HttpException(
        'Something went wrong while getting all books', 
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}