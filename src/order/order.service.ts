import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemEntity } from './orderitem.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }


  async create(userId: string, dto: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
    }

    const productsIds = dto.orderItems.map((orderItem) => orderItem.productId);
    const relatedProducts = await this.productRepository.findBy({ id: In(productsIds) });

    if (relatedProducts.length !== productsIds.length) {
        throw new NotFoundException('One or more products not found');
    }

    const order = new OrderEntity();
    order.status = OrderStatus.PROCESSING;
    order.user = user;

    const orderItems = dto.orderItems.map((orderItem) => {
        const relatedProduct = relatedProducts.find((product) => product.id === orderItem.productId);
        if (!relatedProduct) {
            throw new NotFoundException(`Product with id ${orderItem.productId} not found`);
        }

        const orderItemEntity = new OrderItemEntity();
        orderItemEntity.product = relatedProduct;
        orderItemEntity.orderPrice = relatedProduct.price;
        orderItemEntity.quantity = orderItem.quantity;
        orderItemEntity.product.quantity -= orderItem.quantity;

        return orderItemEntity;
    });

    const totalPrice = orderItems.reduce((total, item) => {
        return total + item.orderPrice * item.quantity;
    }, 0);

    order.orderItems = orderItems;
    order.totalPrice = totalPrice;

    return await this.orderRepository.save(order);
}
  async update(orderId) {

  }

  async listAll() {
    return this.orderRepository.find();
  }

  async findById(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new Error('Falha ao carregar pedido');
    }
  }

}
