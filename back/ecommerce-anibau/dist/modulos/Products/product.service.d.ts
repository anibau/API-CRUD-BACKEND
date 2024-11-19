import { ProductRepository } from './product.repository';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    getProduct(): Promise<import("./product.entity").Products[]>;
}
