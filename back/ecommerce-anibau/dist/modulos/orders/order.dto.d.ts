import { Products } from "../Products/product.entity";
export declare class CreateOrderDto {
    userId: string;
    products: Partial<Products>[];
}
