import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { CustomLogger } from '../customLogger/custom-logger.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductService,
    private readonly logger: CustomLogger
  ) { 
    this.logger.setContext('ProdutoController');
  }

  @Post()
  async create(@Body() dto: CreateProductDTO) {
    this.logger.logInFile(dto);
    this.logger.colorLog(dto);
    return await this.productRepository.create(dto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listAll() {
    return this.productRepository.listAll();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async findById(@Param('id') productId: string) {
    return await this.productRepository.findById(productId);
  }


  @Put('/:id')
  async update(@Param('id') id: string, @Body() dadosProduto: UpdateProductDTO,) {
    return await this.productRepository.update(id, dadosProduto);
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
