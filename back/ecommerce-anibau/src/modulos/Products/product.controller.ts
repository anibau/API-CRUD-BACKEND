import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../Auth/auth.guard';
import { Products } from './product.entity';
import { validateProduct } from '../../Utils/validateProduct';
import { ProductDto } from './productDto';
import { Role, Roles } from '../Auth/roles.decorator';
import { RolesGuard } from '../Auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    try{
      return this.productsService.getProduct();
    } catch{
      throw new BadRequestException('Error al obtener los products')
    }
  }

  @Get('seeder')
  async addProductJSON(){
    return this.productsService.addProductJSON()
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductbyId(@Param('id', ParseUUIDPipe) id:string ) {
    try{
      return this.productsService.getProductbyId(id);
    }catch{
      throw new BadRequestException('Error al obtener el products por id '+id)
    }
  }
  @Post()
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: ProductDto): Promise<Products> {
    try{
      if(validateProduct(data)){
        return this.productsService.createProduct(data);
      } else {throw new NotFoundException('Error: datos incompletos para la creacion de productos')}
    }  catch{
      throw new BadRequestException('Error al crear el producto')
    }
  }
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() data:ProductDto,
  ) {
    try{
      if(validateProduct(data)){
        return this.productsService.updateProduct(id, data);
      } else{
        throw new NotFoundException('Error: datos incompletos para la actualizacion de producto')
      }
    }catch{
      throw new BadRequestException('Error al actualizar el producto por id '+id)
    }
  }
  @Delete(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseUUIDPipe) id:string) {
    try{
      return this.productsService.deleteProduct(id);
    }catch{
      throw new BadRequestException('Error al eliminar el products por id '+id)
    }
  }
}
