import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemsDto } from './create-order_items_.dto.js';

export class UpdateOrderItemsDto extends PartialType(CreateOrderItemsDto) {}