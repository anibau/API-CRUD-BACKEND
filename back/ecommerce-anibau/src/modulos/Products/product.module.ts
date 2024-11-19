import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductsController],
})
export class ProductModule {}
