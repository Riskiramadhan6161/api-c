import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderItemsService } from './order_items_.service.js';
import { CreateOrderItemsDto } from './dto/create-order_items_.dto.js';
import { UpdateOrderItemsDto } from './dto/update-order_items_.dto.js';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemsDto: CreateOrderItemsDto) {
    return this.orderItemsService.create(createOrderItemsDto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
      findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.findOne(id);
      }
      
    @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateOrderItemsDto: UpdateOrderItemsDto, // Sesuaikan namanya
  ) {
    return this.orderItemsService.update(id, updateOrderItemsDto); // Gunakan variabel kecil
  }
    
      @Delete(':id')
      remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.remove(id);
      }
    }