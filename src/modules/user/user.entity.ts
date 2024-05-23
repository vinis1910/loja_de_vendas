import { OrderEntity } from "src/modules/order/order.entity";
import {Entity,
        Column,
        PrimaryGeneratedColumn,
        OneToMany
    } from 'typeorm'
import { AuditModel } from "../auditModel/audit-model.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class UserEntity extends AuditModel{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', length: 100, nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Exclude()
    @Column({name: 'password', nullable: false})
    password: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    order: OrderEntity[];
}