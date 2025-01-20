
import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { Categories } from "../modulos/categories/categories.entity";
import { OrderDetails } from "../modulos/orderDetails/orderDetail.entity";
import { Orders } from "../modulos/orders/orders.entity";
import { Products } from "../modulos/Products/product.entity";
import { Users } from "../modulos/Users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

//cargar variables de entorno desde .env
dotenvConfig({path:'.env'})

//objeto de configuracion postgres
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
//registra la configuración con un nombre, en este caso, 'typeorm'.
export default registerAs('typeorm', ()=>config);
// Se instancia una nueva conexión usando el objeto config y se espera que cumpla con la interfaz DataSourceOptions .
export const connectionSource= new DataSource(config as DataSourceOptions)