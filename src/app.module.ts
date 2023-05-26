import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModel } from './data-access/books/book.model';
import { connectionOptions } from './data-access/connection-options';
import { AppController } from './entrypoint/api/app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([BookModel])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
