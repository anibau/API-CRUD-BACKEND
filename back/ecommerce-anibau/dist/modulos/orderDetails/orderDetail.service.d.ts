import { OrderDetailRepository } from "./orderDetail.repository";
import { OrderDetails } from "./orderDetail.entity";
export declare class OrderDetailService {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: OrderDetailRepository);
    getAll(): Promise<OrderDetails[]>;
    getbyId(id: string): Promise<OrderDetails>;
    addDetail(data: Partial<OrderDetails>): Promise<OrderDetails>;
}
