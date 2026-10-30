import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { book } from './entities/book-entity.js'; // Sesuaikan path file entity kamu

@Module({
  imports: [TypeOrmModule.forFeature([book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
