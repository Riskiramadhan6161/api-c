import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressesService } from './customer_addresses.service.js';
import { CustomerAddressesController } from './customer_addresses.controller.js';
import { CustomerAddress } from './entities/customer_address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
  exports: [CustomerAddressesService],
})
export class CustomerAddressesModule {}