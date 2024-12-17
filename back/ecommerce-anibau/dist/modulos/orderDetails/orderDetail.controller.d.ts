import { OrderDetailService } from "./orderDetail.service";
import { OrderDetails } from "./orderDetail.entity";
import { OrderDetailDto } from "./orderDetail.dto";
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    getAll(): Promise<OrderDetails[]>;
    getbyId(id: string): Promise<OrderDetails>;
    addDetail(data: OrderDetailDto): Promise<OrderDetails>;
}
