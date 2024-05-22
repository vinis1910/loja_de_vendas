import {Entity,
        Column,
        PrimaryGeneratedColumn,
        OneToMany,
        ManyToOne
    } from 'typeorm'
import { OrderStatus } from "./enum/orderstatus.enum";
import { UserEntity } from "../user/user.entity";
import { OrderItemEntity } from './orderitem.entity';
import { AuditModel } from '../auditModel/audit-model.entity';

@Entity('orders')
export class OrderEntity extends AuditModel{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'total_price', nullable: false})
    totalPrice: number;

    @Column({name: 'status',enum: OrderStatus, nullable: false})
    status: OrderStatus;

    @ManyToOne(() => UserEntity, (user) => user.order)
    user: UserEntity;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order,{
        cascade: true
    })
    orderItems: OrderItemEntity[];
}