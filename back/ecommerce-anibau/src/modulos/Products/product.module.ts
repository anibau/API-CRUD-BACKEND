import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductsController],
})
export class ProductModule {}
