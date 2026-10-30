export class CreateShipmentDto {
  readonly orderId: number;
  readonly courier: string;
  readonly trackingNumber?: string;
  readonly status?: string;
}