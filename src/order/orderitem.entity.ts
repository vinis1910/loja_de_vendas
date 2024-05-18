import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/product.entity';

@Entity('orderItems')
export class OrderItemEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'order_price', nullable: false })
    orderPrice: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
        cascade: ['update']
    })
    product: ProductEntity;
}