import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(book)
    private readonly bookRepository: Repository<book>,
  ) {}

  async findAll(): Promise<book[]> {
    return this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<book> {
    const dataBook = await this.bookRepository.findOneBy({ id });

    if (!dataBook) {
      throw new NotFoundException('Mahasiswa tidak ditemukan');
    }
    return dataBook;
  }

  async create(dto: CreateBookDto): Promise<book> {
    const newBook = this.bookRepository.create(dto);
    return await this.bookRepository.save(newBook);
  }

  async update(id: string, dto: CreateBookDto): Promise<book> {
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
