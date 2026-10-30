export class CreateOrderItemsDto {
  readonly orderId: number;
  readonly bookId: number;
  readonly quantity: number;
  readonly price: number;
}