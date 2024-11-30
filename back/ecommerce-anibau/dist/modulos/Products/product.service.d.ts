import { ProductRepository } from './product.repository';
import { Products } from './product.entity';
import { ProductDto } from './productDto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    getProduct(): Promise<Products[]>;
    getProductbyId(id: string): Promise<Products[]>;
    createProduct(body: ProductDto): Promise<Products>;
    updateProduct(id: string, data: ProductDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
