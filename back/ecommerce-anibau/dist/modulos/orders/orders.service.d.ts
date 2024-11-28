import { OrderRepository } from "./orders.repository";
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: OrderRepository);
    getOrder(id: string): Promise<import("./orders.entity").Orders>;
    getOrderall(): Promise<import("./orders.entity").Orders[]>;
    addOrder(data: any, dataDetail: any): Promise<import("./orders.entity").Orders>;
}
