import { Orders } from "../orders/orders.entity";
import { Products } from "../Products/product.entity";
export declare class OrderDetails {
    id: string;
    price: number;
    order: Orders;
    products: Products[];
}
