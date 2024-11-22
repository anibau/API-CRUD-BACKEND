import { ProductService } from './product.service';
import { Products } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): Promise<Products[]>;
    getProductbyId(id: string): Promise<Products>;
    createProduct(data: Omit<Products, 'id'>): Promise<{
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
        id: number;
    }>;
    updateProduct(id: string, data: {
        prop: string;
        dato: string;
    }): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
