import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProduct() {
    return 'get Products';
  }
}
