import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find({
      relations: {
        order: true,
      },
    });
  }

  async findOne(id: string) { // Diubah dari number ke string (UUID)
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(`Payment dengan ID ${id} tidak ditemukan`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) { // Diubah dari number ke string
    await this.findOne(id);
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: string) { // Diubah dari number ke string
    const payment = await this.findOne(id);
    return this.paymentRepository.remove(payment);
  }
}