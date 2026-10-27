import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../mahasiswa/dto/register.dto.js';
import { LoginDto } from '../mahasiswa/dto/login.dto.js';
import { ForgotPasswordDto } from '../mahasiswa/dto/forgot-password.dto.js';
import { ResetPasswordDto } from '../mahasiswa/dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  // 1. Fungsi Login (menerima DTO dari POST)
  login(dto: LoginDto) {
    return {
      message: 'Login berhasil',
      data: dto,
    };
  }

  // 2. Fungsi Register (menerima DTO dari POST)
  register(dto: RegisterDto) {
    return {
      message: 'Registrasi berhasil',
      data: dto,
    };
  }

  // 3. Fungsi Forgot Password (menerima DTO dari GET ?email=...)
  forgotPassword(dto: ForgotPasswordDto) {
    return {
      message: 'Email reset password berhasil dikirim',
      data: dto,
    };
  }

  // 4. Fungsi Verifikasi Token (menerima parameter token dari GET /reset-password/:token)
  verifyToken(token: string) {
    return {
      message: 'Token reset password valid',
      token: token,
    };
  }

  // 5. Fungsi Reset Password (menerima DTO dari PATCH)
  resetPassword(dto: ResetPasswordDto) {
    return {
      message: 'Password berhasil diperbarui',
      data: dto,
    };
  }
}