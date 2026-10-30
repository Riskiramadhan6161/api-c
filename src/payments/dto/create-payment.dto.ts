export class CreatePaymentDto {
  readonly orderId: number;
  readonly amount: number;
  readonly paymentMethod: string;
  readonly status?: string;
}