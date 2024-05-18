import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductService) { }

  @Post()
  async create(@Body() dto: CreateProductDTO) {
    const produtoCadastrado = this.productRepository.create(dto);

    return produtoCadastrado;
  }

  @Get()
  async listAll() {
    return this.productRepository.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dadosProduto: UpdateProductDTO,) {
    const produtoAlterado = await this.productRepository.update(id, dadosProduto);

    return 
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const productRemovido = await this.productRepository.delete(id);

    return {
      mensagem: 'produto removido com sucesso',
      product: productRemovido,
    };
  }
}
