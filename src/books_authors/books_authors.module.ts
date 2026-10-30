import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksAuthorsService } from './books_authors.service.js';
import { BooksAuthorsController } from './books_authors.controller.js';
import { BooksAuthor } from './entities/books_author.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BooksAuthor])],
  controllers: [BooksAuthorsController],
  providers: [BooksAuthorsService],
  exports: [BooksAuthorsService],
})
export class BooksAuthorsModule {}