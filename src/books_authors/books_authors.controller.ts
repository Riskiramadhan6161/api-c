import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksAuthorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksAuthorDto: UpdateBooksAuthorDto) {
    return this.booksAuthorsService.update(+id, updateBooksAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksAuthorsService.remove(+id);
  }
}