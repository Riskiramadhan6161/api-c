import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  create(createPublisherDto: CreatePublisherDto) {
    const publisher = this.publisherRepository.create(createPublisherDto);
    return this.publisherRepository.save(publisher);
  }

  findAll() {
    return this.publisherRepository.find();
  }

  async findOne(id: number) {
    const publisher = await this.publisherRepository.findOne({ where: { id } });
    if (!publisher) {
      throw new NotFoundException(`Publisher dengan ID ${id} tidak ditemukan`);
    }
    return publisher;
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    await this.findOne(id);
    await this.publisherRepository.update(id, updatePublisherDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const publisher = await this.findOne(id);
    return this.publisherRepository.remove(publisher);
  }
}