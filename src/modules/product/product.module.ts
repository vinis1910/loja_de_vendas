import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { CustomLoggerModule } from '../customLogger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CustomLoggerModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProdutoModule { }
