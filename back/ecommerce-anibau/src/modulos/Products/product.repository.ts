import { Injectable } from '@nestjs/common';
import { Products } from './product.entity';

@Injectable()
export class ProductRepository {
  private Products: Products[] = [
    {
      id: 1,
      name: 'camisa',
      description: 'ropa de hombre',
      price: 20,
      stock: true,
      imgUrl: 'string',
    },
    {
      id: 2,
      name: 'polo',
      description: 'ropa de hombre',
      price: 20,
      stock: true,
      imgUrl: 'string',
    },
    {
      id: 3,
      name: 'vestido',
      description: 'ropa de hombre',
      price: 20,
      stock: true,
      imgUrl: 'string',
    },
    {
      id: 4,
      name: 'short',
      description: 'ropa de hombre',
      price: 20,
      stock: true,
      imgUrl: 'string',
    },
  ];
  async getProducts() {
    return this.Products;
  }
  async setProduct(products) {
    this.Products = products;
  }
}
