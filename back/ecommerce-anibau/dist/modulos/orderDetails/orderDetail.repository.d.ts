import { OrderDetails } from "./orderDetail.entity";
import { Repository } from "typeorm";
import { Orders } from "../orders/orders.entity";
export declare class OrderDetailRepository {
    private orderDetailRepository;
    private orderRepository;
    constructor(orderDetailRepository: Repository<OrderDetails>, orderRepository: Repository<Orders>);
    getAll(): Promise<OrderDetails[]>;
    getById(id: string): Promise<OrderDetails>;
    addOrderDetail(data: Partial<OrderDetails>): Promise<OrderDetails>;
}
