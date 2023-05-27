import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookModel } from './book.model';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(BookModel)
    private booksRepository: Repository<BookModel>,
  ) {}

  findAll(): Promise<BookModel[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<BookModel | null> {
    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async saveBook(book: BookModel): Promise<BookModel> {
    return this.booksRepository.save(book);
  }
}
