import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Book> {
    const dataBook = await this.bookRepository.findOneBy({ id });

    if (!dataBook) {
      throw new NotFoundException('Mahasiswa tidak ditemukan');
    }
    return dataBook;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(dto);
    return await this.bookRepository.save(newBook);
  }

  async update(id: string, dto: CreateBookDto): Promise<Book> {
    // Pastikan data lama ada (akan throw error 404 jika tidak ada)
    await this.findOne(id);

    // Gabungkan data lama dengan data baru dari DTO
    await this.bookRepository.update(id, dto);

    // Kembalikan data yang sudah di-update
    return await this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string; deleteId: string }> {
    await this.findOne(id);

    await this.bookRepository.softDelete(id);

    return {
      message: 'Data berhasil dihapus',
      deleteId: id,
    };
  }
}
