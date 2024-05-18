import { OrderEntity } from "src/order/order.entity";
import {Entity,
        Column,
        CreateDateColumn,
        UpdateDateColumn,
        DeleteDateColumn,
        PrimaryGeneratedColumn,
        OneToMany
    } from 'typeorm'

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', length: 100, nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    order: OrderEntity[];
}