import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Products } from './product.entity';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @HttpCode(200)
  getProducts() {
    return this.productsService.getProduct();
  }
  @Get(':id')
  @HttpCode(200)
  getProductbyId(@Param('id') id: string) {
    return this.productsService.getProductbyId(Number(id));
  }
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createProduct(@Body() data: Omit<Products, 'id'>) {
    return this.productsService.createProduct(data);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateProduct(
    @Param('id') id: string,
    @Body() data: { prop: string; dato: string },
  ) {
    return this.productsService.updateProduct(Number(id), data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
