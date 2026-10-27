import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service.js';
import { mahasiswa } from './entities/mahasiswa-entity.js';
import { CreateMhasiswaDto } from './dto/create-mahasiswa-dto.js';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  // Menampilkan data
  @Get()
  getAllmahasiswa(): Promise<mahasiswa[]> {
    return this.mahasiswaService.findAll();
  }

  @Get(':id')
  getMahasiswaById(@Param('id') id: string) {
    return this.mahasiswaService.findOne(id); // Langsung gunakan id (sudah string)
  }

  // Menyimpan data mahasiswa baru
  @Post()
  createMahasiswa(@Body() mahasiswaDto: CreateMhasiswaDto) {
    return this.mahasiswaService.create(mahasiswaDto);
  }

  @Put(':id')
  updateMahasiswa(
    @Param('id') id: string,
    @Body() mahasiswaDto: CreateMhasiswaDto,
  ) {
    return this.mahasiswaService.update(id, mahasiswaDto); // Hapus Number(id)
  }

  @Delete(':id')
  deleteMahasiswa(@Param('id') id: string) {
    return this.mahasiswaService.delete(id); // Hapus Number(id) dan @Body() yang tidak perlu
  }
}
