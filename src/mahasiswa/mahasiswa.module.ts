import { Module } from '@nestjs/common';
import { MahasiswaController } from './mahasiswa.controller.js';

@Module({
  controllers: [MahasiswaController]
})
export class MahasiswaModule {}
