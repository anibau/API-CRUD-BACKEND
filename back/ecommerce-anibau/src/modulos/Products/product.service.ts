import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Products } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  getProduct() {
    return this.productRepository.getProducts();
  }
  async getProductbyId(id: number) {
    const products: Products[] = await this.productRepository.getProducts();
    const product: Products = products.find((item) => item.id === id);
    if (!product) {
      throw new Error(`el producto ${id} no existe`);
    }
    return product;
  }
  async createProduct(body: Omit<Products, 'id'>) {
    const products: Products[] = await this.productRepository.getProducts();
    const id = products.length + 1;
    products.push({ id, ...body });
    return { id, ...body };
  }
  async updateProduct(id: number, data: { prop: string; dato: string }) {
    const products: Products[] = await this.productRepository.getProducts();
    const product: Products = products.find((item) => item.id === id);
    if (!product) {
      throw new Error(`el producto ${id} no existe`);
    }
    const { prop, dato } = data;
    if (!(prop in product)) {
      throw new Error(`la propiedad ${prop} no existe`);
    }
    product[prop] = dato;
    return `producto con id ${id} actualizado exitosamente`;
  }
  async deleteProduct(id: number) {
    const products: Products[] = await this.productRepository.getProducts();
    const product = products.filter((user) => user.id !== id);
    this.productRepository.setProduct(product);
    return `el producto con id ${id} fue eliminado exitosamente`;
  }
}
