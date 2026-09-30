import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service.js';
import { mahasiswa } from './entities/mahasiswa-entity.js';
import { CreateMhasiswaDto } from './dto/create-mahasiswa-dto.js';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  // Menampilkan data
  @Get()
  getAllmahasiswa(): mahasiswa[] {
    // Logic untuk mengambil data dari service
    return this.mahasiswaService.findAll();
  }

  @Get(':id')
  getMahasiswaById(@Param('id') id: string){
    return this.mahasiswaService.findOne(Number(id));
  }

  //menyimpan data mahasiswa baru//
  @Post()
  createMahasiswa(@Body() mahasiswa: CreateMhasiswaDto) {
    //logic untuk menyimpan data buku//
    return this.mahasiswaService.create(mahasiswa);

  }

@Put(':id')
updateMahasiswa(
  @Param('id') id: string,
  @Body() mahasiswa: CreateMhasiswaDto,
) {
  // Panggil service dan kembalikan objeknya
  return this.mahasiswaService.update(Number(id), mahasiswa);
}

  @Delete (':id')
  deleteMahasiswa( @Param('id') id: string,
  @Body() mahasiswa: CreateMhasiswaDto,
 ) {
    return this.mahasiswaService.delete(Number(id));
 }

}