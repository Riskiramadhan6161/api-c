
export class CreateOrderDto {
  readonly customerId: number;
  readonly totalAmount: number;
  readonly status?: string;
}