import { Categories } from "../modulos/categories/categories.entity";
import { OrderDetails } from "../modulos/orderDetails/orderDetail.entity";
import { Orders } from "../modulos/orders/orders.entity";
import { Products } from "../modulos/Products/product.entity";
import { Users } from "../modulos/Users/user.entity";
import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    entities: (typeof Categories | typeof Products | typeof OrderDetails | typeof Orders | typeof Users)[];
    synchronize: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    entities: (typeof Categories | typeof Products | typeof OrderDetails | typeof Orders | typeof Users)[];
    synchronize: boolean;
}>;
export default _default;
export declare const connectionSource: DataSource;
