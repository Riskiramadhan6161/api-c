import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { Category } from './entities/category.entity.js'; // Pastikan path entity ini sesuai dengan letak file entity di atas

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Sangat penting agar repository dikenali
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}