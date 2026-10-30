import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Menggunakan GET untuk mengambil data profil berdasarkan email/param
  @Get('profile/:email')
  getProfile(@Param('email') email: string) {
    return this.authService.getProfile(email);
  }

  // Menggunakan PATCH untuk memperbarui data user/auth
  @Patch('profile/:email')
  updateProfile(@Param('email') email: string, @Body() updateData: any) {
    return this.authService.updateProfile(email, updateData);
  }
}