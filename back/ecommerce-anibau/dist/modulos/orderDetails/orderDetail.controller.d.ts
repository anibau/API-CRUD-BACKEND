import { OrderDetailService } from "./orderDetail.service";
import { OrderDetails } from "./orderDetail.entity";
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    getAll(): Promise<OrderDetails[]>;
    getbyId(id: string): Promise<OrderDetails>;
    addDetail(data: Partial<OrderDetails>): Promise<OrderDetails>;
}
