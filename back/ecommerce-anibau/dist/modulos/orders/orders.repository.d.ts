import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "../Users/user.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
import { Products } from "../Products/product.entity";
export declare class OrderRepository {
    private orderRepository;
    private userRepository;
    private orderDetailRepository;
    private productRepository;
    constructor(orderRepository: Repository<Orders>, userRepository: Repository<Users>, orderDetailRepository: Repository<OrderDetails>, productRepository: Repository<Products>);
    getOrderAll(): Promise<Orders[]>;
    getOrder(id: string): Promise<Orders>;
    addOrder(data: Partial<Orders>, dataDetail: Partial<OrderDetails>): Promise<Orders>;
}
