import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksAuthor } from './entities/books_author.entity.js';
import { CreateBooksAuthorDto } from './dto/create-books_author.dto.js';
import { UpdateBooksAuthorDto } from './dto/update-books_author.dto.js';

@Injectable()
export class BooksAuthorsService {
  constructor(
    @InjectRepository(BooksAuthor)
    private readonly booksAuthorRepository: Repository<BooksAuthor>,
  ) {}

  create(createBooksAuthorDto: CreateBooksAuthorDto) {
    const booksAuthor = this.booksAuthorRepository.create(createBooksAuthorDto);
    return this.booksAuthorRepository.save(booksAuthor);
  }

  findAll() {
    return this.booksAuthorRepository.find({
      relations: {
        book: true,
        author: true,
      },
    });
  }

  async findOne(id: number) {
    const booksAuthor = await this.booksAuthorRepository.findOne({
      where: { id },
      relations: {
        book: true,
        author: true,
      },
    });
    if (!booksAuthor) {
      throw new NotFoundException(`BooksAuthor dengan ID ${id} tidak ditemukan`);
    }
    return booksAuthor;
  }

  async update(id: number, updateBooksAuthorDto: UpdateBooksAuthorDto) {
    await this.findOne(id);
    await this.booksAuthorRepository.update(id, updateBooksAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const booksAuthor = await this.findOne(id);
    return this.booksAuthorRepository.remove(booksAuthor);
  }
}