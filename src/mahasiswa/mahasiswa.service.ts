import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mahasiswa } from './entities/mahasiswa-entity.js';
import { CreateMhasiswaDto } from './dto/create-mahasiswa-dto.js';

@Injectable()
export class MahasiswaService {
  
  constructor(
    @InjectRepository(mahasiswa)
    private readonly mahasiswaRepository: Repository<mahasiswa>,
  ) {}

  async findAll(): Promise<mahasiswa[]> {
    return this.mahasiswaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<mahasiswa> {
    const dataMahasiswa = await this.mahasiswaRepository.findOneBy({ id });

    if (!dataMahasiswa) {
      throw new NotFoundException('Mahasiswa tidak ditemukan');
    }
    return dataMahasiswa;
  }

  async create(dto: CreateMhasiswaDto): Promise<mahasiswa> {
    const newMahasiswa = this.mahasiswaRepository.create(dto);
    return await this.mahasiswaRepository.save(newMahasiswa);
  }

  async update(id: string, dto: CreateMhasiswaDto): Promise<mahasiswa> {
    // Pastikan data lama ada (akan throw error 404 jika tidak ada)
    await this.findOne(id);

    // Gabungkan data lama dengan data baru dari DTO
    await this.mahasiswaRepository.update(id, dto);

    // Kembalikan data yang sudah di-update
    return await this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string; deleteId: string }> {
    await this.findOne(id);

    await this.mahasiswaRepository.softDelete(id);

    return {
      message: 'Data berhasil dihapus',
      deleteId: id,
    };
  }
}