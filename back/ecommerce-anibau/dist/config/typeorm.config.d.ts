import { Categories } from "src/modulos/categories/categories.entity";
import { OrderDetails } from "src/modulos/orderDetails/orderDetail.entity";
import { Orders } from "src/modulos/orders/orders.entity";
import { Products } from "src/modulos/Products/product.entity";
import { Users } from "src/modulos/Users/user.entity";
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
