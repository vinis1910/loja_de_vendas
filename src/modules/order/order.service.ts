import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemEntity } from './orderitem.entity';
import { OrderStatus } from './enum/orderstatus.enum';

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
      throw new NotFoundException(`Usuario com ID: ${userId} não foi encontrado`);
    }

    const productsIds = dto.orderItems.map((orderItem) => orderItem.productId);
    const relatedProducts = await this.productRepository.findBy({ id: In(productsIds) });

    if (relatedProducts.length !== productsIds.length) {
      throw new NotFoundException('Um ou mais produtos não foram encontrados');
    }

    const order = new OrderEntity();
    order.status = OrderStatus.PROCESSING;
    order.user = user;

    const orderItems = dto.orderItems.map((orderItem) => {
      const relatedProduct = relatedProducts.find((product) => product.id === orderItem.productId);
      if (!relatedProduct) {
        throw new NotFoundException(`Produto com o ID ${orderItem.productId} não foi encontrado`);
      }
    
      const orderItemEntity = new OrderItemEntity();
      orderItemEntity.product = relatedProduct;
      orderItemEntity.orderPrice = relatedProduct.price;
      orderItemEntity.quantity = orderItem.quantity;
    
      if (orderItem.quantity > relatedProduct.quantity) {
        throw new BadRequestException('Quantidade não disponível em estoque');
      }
    
      relatedProduct.quantity -= orderItem.quantity;
    
      return orderItemEntity;
    });

    const totalPrice = orderItems.reduce((total, item) => {
      return total + item.orderPrice * item.quantity;
    }, 0);

    order.orderItems = orderItems;
    order.totalPrice = totalPrice;

    return await this.orderRepository.save(order);
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`O pedido com ID: ${id} não foi encontrado`);
    }

    Object.assign(order, dto as UserEntity);

    return this.orderRepository.save(order);
  }

  async delete(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Pedido com ID: ${id} não encontrado`);
    }

    const resultado = await this.orderRepository.delete(id);

    if (!resultado.affected) {
      throw new Error(`Falha ao excluir produto com ID: ${id}`);
    }
    return resultado;
  }

  async listAll() {
    return this.orderRepository.find();
  }

  async findById(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException(`Pedido com ID: ${id} não encontrado`);
      }
      return order;
    } catch (error) {
      throw new Error('Falha ao carregar pedido');
    }
  }

}
