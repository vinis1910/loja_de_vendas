import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionamentoOrderOrderItemsProduct1716007012771 implements MigrationInterface {
    name = 'RelacionamentoOrderOrderItemsProduct1716007012771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "orderItems" 
            ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "quantity" integer NOT NULL, 
            "order_price" integer NOT NULL, 
            "orderId" uuid, 
            "productId" uuid, 
            CONSTRAINT "PK_b1b864ba2b7d5762d34265cc8b8" PRIMARY KEY ("id"))`);

        await queryRunner.query(
            `ALTER TABLE "orderItems" ADD CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e" FOREIGN KEY ("orderId") 
            REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(
            `ALTER TABLE "orderItems" ADD CONSTRAINT "FK_51d8fc35a95624166faeca65e86" FOREIGN KEY ("productId") 
            REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_51d8fc35a95624166faeca65e86"`);
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e"`);
        await queryRunner.query(`DROP TABLE "orderItems"`);
    }

}
