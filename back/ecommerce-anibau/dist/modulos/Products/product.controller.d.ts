import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): Promise<import("./product.entity").Products[]>;
    getProductbyId(id: string): Promise<import("./product.entity").Products[]>;
    createProduct(data: ProductDto): Promise<import("./product.entity").Products>;
    updateProduct(id: string, data: Partial<ProductDto>): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
