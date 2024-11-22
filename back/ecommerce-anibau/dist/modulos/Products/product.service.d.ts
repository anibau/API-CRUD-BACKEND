import { ProductRepository } from './product.repository';
import { Products } from './product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    getProduct(): Promise<Products[]>;
    getProductbyId(id: number): Promise<Products>;
    createProduct(body: Omit<Products, 'id'>): Promise<{
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
        id: number;
    }>;
    updateProduct(id: number, data: {
        prop: string;
        dato: string;
    }): Promise<string>;
    deleteProduct(id: number): Promise<string>;
}
