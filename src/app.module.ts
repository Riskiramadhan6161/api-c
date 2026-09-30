import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [MahasiswaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
