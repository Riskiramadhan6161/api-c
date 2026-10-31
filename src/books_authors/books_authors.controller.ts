import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BooksAuthorsService } from './books_authors.service.js';
import { CreateBooksAuthorDto } from './dto/create-books_author.dto.js';
import { UpdateBooksAuthorDto } from './dto/update-books_author.dto.js';

@Controller('books-authors')
export class BooksAuthorsController {
  constructor(private readonly booksAuthorsService: BooksAuthorsService) {}

  @Post()
  create(@Body() createBooksAuthorDto: CreateBooksAuthorDto) {
    return this.booksAuthorsService.create(createBooksAuthorDto);
  }

  @Get()
  findAll() {
    return this.booksAuthorsService.findAll();
  }

  // Menggunakan dua parameter UUID: book_id dan author_id
  @Get(':book_id/:author_id')
  findOne(
    @Param('book_id', ParseUUIDPipe) book_id: string,
    @Param('author_id', ParseUUIDPipe) author_id: string,
  ) {
    return this.booksAuthorsService.findOne(book_id, author_id);
  }

  @Patch(':book_id/:author_id')
  update(
    @Param('book_id', ParseUUIDPipe) book_id: string,
    @Param('author_id', ParseUUIDPipe) author_id: string,
    @Body() updateBooksAuthorDto: UpdateBooksAuthorDto,
  ) {
    return this.booksAuthorsService.update(book_id, author_id, updateBooksAuthorDto);
  }

  @Delete(':book_id/:author_id')
  remove(
    @Param('book_id', ParseUUIDPipe) book_id: string,
    @Param('author_id', ParseUUIDPipe) author_id: string,
  ) {
    return this.booksAuthorsService.remove(book_id, author_id);
  }
}