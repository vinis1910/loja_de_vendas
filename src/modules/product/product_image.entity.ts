import { UUID } from "crypto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity('product_image')
export class ImageProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    url: string;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @ManyToOne(() => ProductEntity, (product) => product.images,
        { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: ProductEntity;
}