import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

export abstract class AuditModel{
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}