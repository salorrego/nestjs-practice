import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BookModel } from '../../data-access/books/book.model';
import { BooksService } from '../../domain/service/books.service';
import { CreateBookRequest } from '../../domain/entities/create-book-request';

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all books from the db',
    type: BookModel,
    isArray: true,
  })
  @ApiQuery({
    name: 'name',
    description: 'Name to filter search.',
    required: false,
  })
  async getAll(@Query('name') name: string): Promise<BookModel[]> {
    return this.booksService.getAllBooks(name);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new book to add to the DB',
    type: BookModel,
  })
  async createBook(@Body() body: CreateBookRequest): Promise<BookModel> {
    return this.booksService.createBook(body);
  }

  @Post(':bookId/reserve')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Reserve a book',
    type: BookModel,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Couldn't reserve a book, alread reserved",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book does not exist',
  })
  async reserveBook(@Param('bookId') bookId: number): Promise<BookModel> {
    return this.booksService.reserveBook(bookId);
  }
}
