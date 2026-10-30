import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  create(createShipmentDto: CreateShipmentDto) {
    const shipment = this.shipmentRepository.create(createShipmentDto);
    return this.shipmentRepository.save(shipment);
  }

  findAll() {
    return this.shipmentRepository.find({
      relations: {
        order: true,
      },
    });
  }

  async findOne(id: number) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });
    if (!shipment) {
      throw new NotFoundException(`Shipment dengan ID ${id} tidak ditemukan`);
    }
    return shipment;
  }

  async update(id: number, updateShipmentDto: UpdateShipmentDto) {
    await this.findOne(id);
    await this.shipmentRepository.update(id, updateShipmentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const shipment = await this.findOne(id);
    return this.shipmentRepository.remove(shipment);
  }
}