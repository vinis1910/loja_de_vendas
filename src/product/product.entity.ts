import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductCharacteristicEntity } from "./product_characteristic.entity";
import { ImageProductEntity } from "./product_image.entity";
import { UUID } from "crypto";
import { UserEntity } from "src/user/user.entity";
import { OrderItemEntity } from "src/order/orderitem.entity";

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ProductCharacteristicEntity, (characteristic) => characteristic.product, { cascade: true, eager: true })
  characteristics: ProductCharacteristicEntity[];

  @OneToMany(() => ImageProductEntity, (image) => image.product, { cascade: true, eager: true })
  images: ImageProductEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

}
