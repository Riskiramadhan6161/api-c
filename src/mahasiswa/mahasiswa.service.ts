import { Injectable } from '@nestjs/common';
import { mahasiswa } from './entities/mahasiswa-entity.js';
import { find } from 'rxjs';
import { CreateMhasiswaDto } from './dto/create-mahasiswa-dto.js';

@Injectable()
export class MahasiswaService {
  private mahasiswa: mahasiswa[] = [
    {
      id: 1,
      name: 'kiki',
      author: 'f.kiki',
      isbn: '978-890-888-5',
      publishedYear: 2024, // <-- Tambahkan properti ini
      isAvailable: true,
    },
  ];

  findAll(): mahasiswa[] {
    return this.mahasiswa;
  }

// Method findOne yang sudah diperbaiki
  findOne(id: number): mahasiswa | undefined {
    return this.mahasiswa.find((item) => item.id === id);
  }


  create(mahasiswa: CreateMhasiswaDto): mahasiswa {
    const newMahasiswa: mahasiswa ={
      id: this.mahasiswa.length + 1,
      name: mahasiswa.name,
      author: mahasiswa.author,
      isbn: mahasiswa.isbn,
      publishedYear: mahasiswa.publishedYear, // <-- Tambahkan properti ini
      isAvailable: true,
    }
    this.mahasiswa.push(newMahasiswa);
    return newMahasiswa
  }

update(id: number, updateData: CreateMhasiswaDto): mahasiswa | undefined {
  const index = this.mahasiswa.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  // Update data
  this.mahasiswa[index] = {
    ...this.mahasiswa[index],
    ...updateData,
  };

  // KEMBALIKAN OBJEK NYA (bukan cuma angka/ID)
  return this.mahasiswa[index]; 
}


delete(id: number): mahasiswa | undefined {
    // 1. Cari indeks data berdasarkan id
    const index = this.mahasiswa.findIndex((item) => item.id === id);

    // 2. Jika data tidak ditemukan, kembalikan undefined
    if (index === -1) {
      return undefined;
    }

    // 3. Simpan data yang akan dihapus untuk dikembalikan sebagai response
    const deletedMahasiswa = this.mahasiswa[index];

    // 4. Hapus 1 elemen pada indeks tersebut menggunakan splice
    this.mahasiswa.splice(index, 1);

    // 5. Kembalikan data yang berhasil dihapus
    return deletedMahasiswa;
  }


}