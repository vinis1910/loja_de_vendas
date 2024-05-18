import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dto/ListProducts.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { randomUUID } from 'crypto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductCharacteristicEntity } from './product_characteristic.entity';
import { ImageProductEntity } from './product_image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>

  ) { }

  async listAll() {
    const savedProducts = await this.productRepository.find();
    const listUsers = savedProducts.map(
      (product) => new ListProductsDTO()
    )

    return listUsers;
  }

  create(dto: CreateProductDTO) {

    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = dto.name;
    product.price = dto.price;
    product.quantity = dto.quantity;
    product.description = dto.description;
    product.category = dto.category;
    product.characteristics = dto.characteristics;
    product.images = dto.images;

    this.productRepository.save(product);
    
    return product;
  }


  async update(id: string, dto: UpdateProductDTO) {
    const product = this.productRepository.update(id, dto)
    return product;
  }

  async delete(id: string) {
    const removedProduct = this.productRepository.delete(id);
    return removedProduct;
  }
}
