import { ProductService } from './product.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getProducts(): Promise<import("./product.entity").Products[]>;
}
