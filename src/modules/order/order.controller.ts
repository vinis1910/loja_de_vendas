import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserRequest } from '../auth/interfaces/userRequest.interface';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() request: UserRequest, @Body() dto: CreateOrderDto) {
    return this.orderService.create(request.user.sub, dto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  listAll() {
    return this.orderService.listAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findById(@Req() request: UserRequest) {
    return this.orderService.findById(request.user.sub);
  }

  @Patch(':id')
  update(@Req() request: UserRequest ,@Param('id') orderId: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(request.user.sub ,orderId, dto);
  }

  @Delete(':id')
  delete(@Req() request: UserRequest) {
    return this.orderService.delete(request.user.sub);
  }
}
