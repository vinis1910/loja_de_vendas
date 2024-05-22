import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.create(userId, dto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  listAll() {
    return this.orderService.listAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') orderId: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(orderId, dto);
  }

  @Delete(':id')
  remove(@Param('id') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
