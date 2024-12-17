import { OrderDetails } from "./orderDetail.entity";
import { Repository } from "typeorm";
import { Orders } from "../orders/orders.entity";
import { Products } from "../Products/product.entity";
import { OrderDetailDto } from "./orderDetail.dto";
export declare class OrderDetailRepository {
    private orderDetailRepository;
    private orderRepository;
    private productRepository;
    constructor(orderDetailRepository: Repository<OrderDetails>, orderRepository: Repository<Orders>, productRepository: Repository<Products>);
    getAll(): Promise<OrderDetails[]>;
    getById(id: string): Promise<OrderDetails>;
    addOrderDetail(data: OrderDetailDto): Promise<OrderDetails>;
}
