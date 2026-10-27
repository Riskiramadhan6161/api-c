import { Controller, Post, Get, Patch, Body, Query, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from '../mahasiswa/dto/register.dto.js';
import { LoginDto } from '../mahasiswa/dto/login.dto.js';
import { ForgotPasswordDto } from '../mahasiswa/dto/forgot-password.dto.js';
import { ResetPasswordDto } from '../mahasiswa/dto/reset-password.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. POST: Login tetap pakai POST demi keamanan data sensitif
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // 2. POST: Register tetap pakai POST untuk membuat user baru
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // 3. GET: Menggunakan GET untuk Forgot Password via Query Parameter (?email=...)
  @Get('forgot-password')
  forgotPassword(@Query('email') email: string) {
    return this.authService.forgotPassword({ email } as ForgotPasswordDto);
  }

  // 4. GET: Verifikasi token reset password via URL Parameter (/auth/reset-password/TOKEN)
  @Get('reset-password/:token')
  verifyResetToken(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }

  // 5. PATCH: Menggunakan PATCH untuk Reset Password karena melakukan update password
  @HttpCode(HttpStatus.OK)
  @Patch('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}