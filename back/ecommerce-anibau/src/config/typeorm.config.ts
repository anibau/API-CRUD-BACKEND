
import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { Categories } from "../modulos/categories/categories.entity";
import { OrderDetails } from "../modulos/orderDetails/orderDetail.entity";
import { Orders } from "../modulos/orders/orders.entity";
import { Products } from "../modulos/Products/product.entity";
import { Users } from "../modulos/Users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({path:'.env'})

const config={
        type: 'postgres',
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT,10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        entities:[Users, Products, Categories, Orders, OrderDetails],
        //entities:['dist/**/*.entity{.ts,.js}'],
        //migrations: ['dist/migrations/*{.ts,.js}'],
        synchronize: true,
        //logging: true,
        //dropSchema:true,
}
export default registerAs('typeorm', ()=>config);
export const connectionSource= new DataSource(config as DataSourceOptions)