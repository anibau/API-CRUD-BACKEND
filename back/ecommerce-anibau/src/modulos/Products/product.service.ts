import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Products } from './product.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  getProduct() {
    return this.productRepository.getProducts();
  }
  async getProductbyId(id:string) {
    return this.productRepository.getProductbyId(id)
  }
  async createProduct(body:ProductDto):Promise<Products> {
    // const products: Products[] = await this.productRepository.getProducts();  : Omit<Products, 'id'>
    // const id = products.length + 1;
    // products.push({ id, ...body });
    // return { id, ...body };
    return this.productRepository.createProduct(body)
  }
  async updateProduct(id:string, data: Partial<ProductDto>) {
    return this.productRepository.updateProduct(id, data);
  }
  async deleteProduct(id:string) {
    return this.productRepository.deleteProduct(id)
  }
}
