import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module.js';

@Module({
  imports: [MahasiswaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
