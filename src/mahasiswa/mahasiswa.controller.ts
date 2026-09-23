import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('mahasiswa')
export class MahasiswaController {
    //menampilkandata 
    @Get()
    getAllmahasiswa():string{
        return "menampilkan semua mahasiswa"
    }
}
