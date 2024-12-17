import { Products } from "../Products/product.entity";
export declare class OrderDetailDto {
    order: string;
    products: Partial<Products>[];
}
