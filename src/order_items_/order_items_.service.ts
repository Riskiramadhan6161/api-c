import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order_items_.entity.js';
import { CreateOrderItemsDto } from './dto/create-order_items_.dto.js';
import { UpdateOrderItemsDto } from './dto/update-order_items_.dto.js';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  create(createOrderItemsDto: CreateOrderItemsDto) {
    const orderItem = this.orderItemRepository.create(createOrderItemsDto);
    return this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return this.orderItemRepository.find({
      relations: {
        order: true,
        book: true,
      },
    });
  }

  async findOne(id: string) { // Diubah dari number ke string (UUID)
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: {
        order: true,
        book: true,
      },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem dengan ID ${id} tidak ditemukan`);
    }
    return orderItem;
  }

  async update(id: string, updateOrderItemsDto: UpdateOrderItemsDto) { // Diubah dari number ke string
    await this.findOne(id);
    await this.orderItemRepository.update(id, updateOrderItemsDto);
    return this.findOne(id);
  }

  async remove(id: string) { // Diubah dari number ke string
    const orderItem = await this.findOne(id);
    return this.orderItemRepository.remove(orderItem);
  }
}