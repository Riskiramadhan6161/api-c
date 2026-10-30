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
        books: true,
      },
    });
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });
    if (!author) {
      throw new NotFoundException(`Author dengan ID ${id} tidak ditemukan`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.findOne(id);
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    return this.authorRepository.remove(author);
  }
}