import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
 // UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
//import { AuthGuard } from '../Auth/auth.guard';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.getProduct();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductbyId(@Param('id') id:string ) {
    return this.productsService.getProductbyId(id);
  }
  @Post()
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: ProductDto) {
    return this.productsService.createProduct(data);
  }
  @Put(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id') id:string,
    @Body() data:Partial<ProductDto>,
  ) {
    return this.productsService.updateProduct(id, data);
  }
  @Delete(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id') id:string) {
    return this.productsService.deleteProduct(id);
  }
}
