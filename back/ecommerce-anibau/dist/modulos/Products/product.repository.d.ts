import { Products } from './product.entity';
export declare class ProductRepository {
    private Products;
    getProducts(): Promise<Products[]>;
}
