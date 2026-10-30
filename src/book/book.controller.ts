import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service.js';
import { book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Menampilkan data
  @Get()
  getAllbook(): Promise<book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.findOne(id); // Langsung gunakan id (sudah string)
  }

  // Menyimpan data mahasiswa baru
  @Post()
  createBook(@Body() bookDto: CreateBookDto) {
    return this.bookService.create(bookDto);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() bookDto: CreateBookDto,
  ) {
    return this.bookService.update(id, bookDto); // Hapus Number(id)
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(id); // Hapus Number(id) dan @Body() yang tidak perlu
  }
}
