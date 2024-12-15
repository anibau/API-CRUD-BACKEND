import { ProductService } from './product.service';
import { Products } from './product.entity';
import { ProductDto } from './productDto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): Promise<Products[]>;
    addProductJSON(): Promise<string>;
    getProductbyId(id: string): Promise<Products>;
    createProduct(data: ProductDto): Promise<Products>;
    updateProduct(id: string, data: ProductDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
