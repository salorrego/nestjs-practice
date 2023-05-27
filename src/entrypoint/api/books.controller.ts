import { Controller, Get } from '@nestjs/common';
import { BookModel } from '../../data-access/books/book.model';
import { BooksService } from '../../domain/books.service';

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(): Promise<BookModel[]> {
    return this.booksService.getAllBooks();
  }
}
