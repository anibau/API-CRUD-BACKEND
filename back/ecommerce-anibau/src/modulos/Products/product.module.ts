import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './product.entity';
import { Categories } from '../categories/categories.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductsController],
})
export class ProductModule {}
