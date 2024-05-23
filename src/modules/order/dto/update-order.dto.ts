import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderstatus.enum';

export class UpdateOrderDto {
    @IsEnum(OrderStatus, {
        message: 'status must be a valid enum value',
    })
    status: OrderStatus;
}
