import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdesController } from "./orders.controller";
import { OrderRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
import { Users } from "../Users/user.entity";
import { Products } from "../Products/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
    providers:[OrdersService, OrderRepository],
    controllers:[OrdesController]
})
export class OrdersModule{}