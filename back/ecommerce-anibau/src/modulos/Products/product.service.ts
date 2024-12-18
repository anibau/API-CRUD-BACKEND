import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Products } from './product.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  //* GET/PRODUCTS/
  async getProduct() {
    return this.productRepository.getProducts();
  }
  //* GET/SEEDER
  async addProductJSON(){
    return this.productRepository.addProductJSON()
  }
  //* GET/PRODUCTS/:ID
  async getProductbyId(id:string) {
    return this.productRepository.getProductbyId(id)
  }
  //* POST/PRODUCTS
  async createProduct(body:ProductDto):Promise<Products> {
    // const products: Products[] = await this.productRepository.getProducts();  : Omit<Products, 'id'>
    // const id = products.length + 1;
    // products.push({ id, ...body });
    // return { id, ...body };
    return this.productRepository.createProduct(body)
  }
  //* PUT/PRODUCTS
  async updateProduct(id:string, data: ProductDto) {
    return this.productRepository.updateProduct(id, data);
  }
  //* DELETE/PRODUCTS
  async deleteProduct(id:string) {
    return this.productRepository.deleteProduct(id)
  }
}
