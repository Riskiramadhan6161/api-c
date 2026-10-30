

export class CreateCustomerAddressDto {
  readonly customerId: number;
  readonly street: string;
  readonly city: string;
  readonly province: string;
  readonly postalCode: string;
}