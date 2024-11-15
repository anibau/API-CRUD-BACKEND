import { ProductService } from './product.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): string;
}
