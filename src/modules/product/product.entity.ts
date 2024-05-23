import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCharacteristicEntity } from "./product_characteristic.entity";
import { ImageProductEntity } from "./product_image.entity";
import { OrderItemEntity } from "src/modules/order/orderitem.entity";
import { AuditModel } from "../auditModel/audit-model.entity";

@Entity('products')
export class ProductEntity extends AuditModel{

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

  @OneToMany(
    () => ProductCharacteristicEntity,
    (productCharacteristicEntity) => productCharacteristicEntity.product,
    { cascade: true, eager: true },
  )
  characteristics: ProductCharacteristicEntity[];
  
  @OneToMany(() => ImageProductEntity, (image) => image.product, { cascade: true, eager: true })
  images: ImageProductEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

}
