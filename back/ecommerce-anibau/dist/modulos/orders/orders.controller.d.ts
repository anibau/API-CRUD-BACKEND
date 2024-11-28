import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
export declare class OrdesController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    getOrderall(): Promise<Orders[]>;
    getOrder(id: string): Promise<Orders>;
    addOrder(data: Partial<Orders>, dataDetail: Partial<OrderDetails>): Promise<Orders>;
}
