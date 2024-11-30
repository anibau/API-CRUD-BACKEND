import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./CreateOrderDto";
export declare class OrdesController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    getOrderall(): Promise<import("./orders.entity").Orders[]>;
    getOrder(id: string): Promise<import("./orders.entity").Orders>;
    addOrder(data: CreateOrderDto): Promise<import("./orders.entity").Orders>;
}
