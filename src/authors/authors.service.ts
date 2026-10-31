import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  findAll() {
    return this.authorRepository.find({
      relations: {
        // Diubah dari 'books' ke 'bookAuthors' beserta relasi ke book-nya sesuai PDF
        bookAuthors: {
          book: true,
        },
      },
    });
  }

  async findOne(id: string) { // Tipe id diubah dari number ke string (UUID)
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: {
        bookAuthors: {
          book: true,
        },
      },
    });
    if (!author) {
      throw new NotFoundException(`Author dengan ID ${id} tidak ditemukan`);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) { // Tipe id diubah ke string
    await this.findOne(id);
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: string) { // Tipe id diubah ke string
    const author = await this.findOne(id);
    return this.authorRepository.remove(author);
  }
}