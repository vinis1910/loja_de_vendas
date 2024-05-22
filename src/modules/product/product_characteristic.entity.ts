import { UUID } from "crypto";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";



@Entity('product_characteristic')
export class ProductCharacteristicEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'description', length: 100, nullable: false })
    description: string;

    @ManyToOne(() => ProductEntity, (product) => product.characteristics,
        { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: ProductEntity;

}