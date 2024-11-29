import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
 // UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
//import { AuthGuard } from '../Auth/auth.guard';
import { ProductDto } from './product.dto';
import { Products } from './product.entity';
import { validateProduct } from 'src/Utils/validateProduct';

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
  @Post('seeder')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: ProductDto): Promise<Products> {
    if(validateProduct(data)){
      return this.productsService.createProduct(data);
    } else {throw new NotFoundException('Error: datos incompletos para la creacion de productos')}
  }
  @Put(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id') id:string,
    @Body() data:Partial<ProductDto>,
  ) {
    if(validateProduct(data)){
      return this.productsService.updateProduct(id, data);
    } else{
      throw new NotFoundException('Error: datos incompletos para la actualizacion de producto')
    }
  }
  @Delete(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id') id:string) {
    return this.productsService.deleteProduct(id);
  }
}
