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

  async create(createBooksAuthorDto: CreateBooksAuthorDto) {
    // Memetakan DTO secara eksplisit ke properti entity book_id dan author_id
    const booksAuthor = this.booksAuthorRepository.create({
      book_id: createBooksAuthorDto.book_id,
      author_id: createBooksAuthorDto.author_id,
    });
    return await this.booksAuthorRepository.save(booksAuthor);
  }

  findAll() {
    return this.booksAuthorRepository.find({
      relations: {
        book: true,
        author: true,
      },
    });
  }

  async findOne(book_id: string, author_id: string) {
    const booksAuthor = await this.booksAuthorRepository.findOne({
      where: { book_id, author_id },
      relations: {
        book: true,
        author: true,
      },
    });
    if (!booksAuthor) {
      throw new NotFoundException(`Relasi book_id dan author_id tersebut tidak ditemukan`);
    }
    return booksAuthor;
  }

  async update(book_id: string, author_id: string, updateBooksAuthorDto: UpdateBooksAuthorDto) {
    const booksAuthor = await this.findOne(book_id, author_id);
    // Menggunakan Object.assign lalu save agar aman untuk composite key
    Object.assign(booksAuthor, updateBooksAuthorDto);
    return await this.booksAuthorRepository.save(booksAuthor);
  }

  async remove(book_id: string, author_id: string) {
    const booksAuthor = await this.findOne(book_id, author_id);
    return await this.booksAuthorRepository.remove(booksAuthor);
  }
}