import { Products } from './product.entity';
import { Repository } from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { ProductDto } from './product.dto';
export declare class ProductRepository {
    private productRepository;
    private categoriesRepository;
    constructor(productRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    getProducts(page: number, limit: number): Promise<Products[]>;
    addProductJSON(): Promise<string>;
    getProductbyId(id: string): Promise<Products>;
    createProduct(product: ProductDto): Promise<Products>;
    updateProduct(id: string, data: ProductDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
