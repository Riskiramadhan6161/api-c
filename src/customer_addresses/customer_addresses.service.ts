import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './entities/customer_address.entity.js';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto.js';

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
  ) {}

  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const address = this.addressRepository.create(createCustomerAddressDto);
    return this.addressRepository.save(address);
  }

  findAll() {
    return this.addressRepository.find({
      relations: {
        customer: true, // Menggunakan format objek untuk TypeORM versi terbaru
      },
    });
  }

  async findOne(id: string): Promise<CustomerAddress> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });
    if (!address) {
      throw new NotFoundException(`Alamat dengan ID ${id} tidak ditemukan`);
    }
    return address;
  }

  async update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) { // Diubah dari number ke string
    await this.findOne(id);
    await this.addressRepository.update(id, updateCustomerAddressDto);
    return this.findOne(id);
  }

  async remove(id: string) { // Diubah dari number ke string
    const address = await this.findOne(id);
    return this.addressRepository.remove(address);
  }
}