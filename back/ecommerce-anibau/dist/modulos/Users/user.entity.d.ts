import { Orders } from "../orders/orders.entity";
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    orders: Orders[];
    isAdmin: boolean;
}
