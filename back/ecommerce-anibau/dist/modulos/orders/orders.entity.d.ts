import { Users } from "../Users/user.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
export declare class Orders {
    id: string;
    user: Users;
    date: Date;
    orderDetails: OrderDetails;
}
