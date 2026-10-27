import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MahasiswaController } from './mahasiswa.controller.js';
import { MahasiswaService } from './mahasiswa.service.js';
import { mahasiswa } from './entities/mahasiswa-entity.js'; // Sesuaikan path file entity kamu

@Module({
  imports: [TypeOrmModule.forFeature([mahasiswa])],
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
})
export class MahasiswaModule {}
