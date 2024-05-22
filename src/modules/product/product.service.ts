import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListCharacteristicProductDTO, ListImageProductDTO, ListProductsDTO } from './dto/ListProducts.dto';
import { CharacteristicsProductDTO, CreateProductDTO, ImageProductDTO } from './dto/CreateProduct.dto';
import { randomUUID } from 'crypto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductCharacteristicEntity } from './product_characteristic.entity';
import { ImageProductEntity } from './product_image.entity';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>

  ) { }

  async listAll() {
    const savedProducts = await this.productRepository.find({
      relations: {
        images: true,
        characteristics: true,
      },
    });

    const listProductsDto = savedProducts.map((produto) => {
      const characteristics = produto.characteristics.map((char) =>
        new ListCharacteristicProductDTO(char.name, char.description)
      );

      const images = produto.images.map((img) =>
        new ListImageProductDTO(img.url, img.description)
      );

      return new ListProductsDTO(produto.id, produto.name, characteristics, images);
    });

    return listProductsDto;
  }

  async findById(id: string) {
    const savedProduct = await this.productRepository.findOne({
      where: { id },
      relations: {
        images: true,
        characteristics: true,
      },
    });

    if (savedProduct === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    const productList = new ListProductsDTO(
      savedProduct.id,
      savedProduct.name,
      savedProduct.characteristics,
      savedProduct.images,
    );

    return productList;
  }

  async create(dto: CreateProductDTO): Promise<ProductEntity> {

    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = dto.name;
    product.price = dto.price;
    product.quantity = dto.quantity;
    product.description = dto.description;
    product.category = dto.category;

    product.characteristics = dto.characteristics.map(charDto => this.createCharacteristicEntity(charDto, product));
    product.images = dto.images.map(imgDto => this.createImageEntity(imgDto, product));

    try {
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      throw new Error(`Falha ao criar o produto. Error: ${error.message}`);
    }
  }

  private createCharacteristicEntity(charDto: CharacteristicsProductDTO, product: ProductEntity): ProductCharacteristicEntity {
    const characteristic = new ProductCharacteristicEntity();
    characteristic.name = charDto.name;
    characteristic.description = charDto.description;
    characteristic.product = product;
    return characteristic;
  }

  private createImageEntity(imgDto: ImageProductDTO, product: ProductEntity): ImageProductEntity {
    const image = new ImageProductEntity();
    image.url = imgDto.url;
    image.description = imgDto.description;
    image.product = product;
    return image;
  }


  async update(id: string, dto: UpdateProductDTO) {
    const productEntity = await this.productRepository.findOneBy({id});

    if(!productEntity){
      throw new NotFoundException(`O produto com ID: ${id} não foi encontrado`)
    }

    Object.assign(productEntity, dto as UserEntity);

    return this.productRepository.save(productEntity);
  }

  async delete(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Produto com ID: ${id} não encontrado`);
    }

    const deleteResult = await this.productRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error(`Falha ao excluir produto com ID: ${id}`);
    }

    return { deleted: true };
  }
}
