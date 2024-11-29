import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { Products } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): Promise<Products[]>;
    getProductbyId(id: string): Promise<Products[]>;
    createProduct(data: ProductDto): Promise<Products>;
    updateProduct(id: string, data: Partial<ProductDto>): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
