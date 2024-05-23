import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderItemDto {

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1, { message: 'A quantidade solicitada deve ser maior que zero' })
  quantity: number;
}

export class CreateOrderDto {

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

}