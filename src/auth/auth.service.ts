import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity.js'; // Menggunakan entity customer sebagai user
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingCustomer) {
      throw new BadRequestException('Email sudah terdaftar!');
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newCustomer = this.customerRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      phone: registerDto.phone || '-', // Sesuaikan dengan kolom entity customer
      // Jika di entity customer ada kolom password, masukkan ke sini:
      // password: hashedPassword,
    });

    return await this.customerRepository.save(newCustomer);
  }

  async login(loginDto: LoginDto) {
    const customer = await this.customerRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!customer) {
      throw new UnauthorizedException('Email atau password salah!');
    }

    // Validasi password (jika sudah menerapkan kolom password di customer)
    // const isPasswordValid = await bcrypt.compare(loginDto.password, customer.password);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Email atau password salah!');
    // }

    return {
      message: 'Login berhasil',
      data: customer,
    };
  }

  async getProfile(email: string) {
    return await this.customerRepository.findOne({ where: { email } });
  }

 async updateProfile(email: string, updateData: any) {
    await this.customerRepository.update({ email }, updateData);
    return await this.getProfile(email); // Memakai this.getProfile, bukan await.getProfile
  }
}