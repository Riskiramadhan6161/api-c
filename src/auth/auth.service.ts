import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../mahasiswa/dto/register.dto.js';
import { LoginDto } from '../mahasiswa/dto/login.dto.js';
import { ForgotPasswordDto } from '../mahasiswa/dto/forgot-password.dto.js';
import { ResetPasswordDto } from '../mahasiswa/dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    return {
      message: 'Login berhasil',
      data: dto,
    };
  }

  register(dto: RegisterDto) {
    return {
      message: 'Registrasi berhasil',
      data: dto,
    };
  }

  forgotPassword(dto: ForgotPasswordDto) {
    return {
      message: 'Email reset password berhasil dikirim',
      data: dto,
    };
  }

  resetPassword(dto: ResetPasswordDto) {
    return {
      message: 'Password berhasil diperbarui',
      data: dto,
    };
  }
}
