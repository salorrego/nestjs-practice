import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookModel } from '../../data-access/books/book.model';
import { BooksService } from '../../domain/service/books.service';
import { CreateBookRequest } from '../../domain/entities/create-book-request';

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(): Promise<BookModel[]> {
    return this.booksService.getAllBooks();
  }

  @Post()
  async createBook(@Body() body: CreateBookRequest): Promise<BookModel> {
    return this.booksService.createBook(body);
  }
}
