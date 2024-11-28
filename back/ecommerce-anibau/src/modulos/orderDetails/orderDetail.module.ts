import { Module } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service";
import { OrderDetailController } from "./orderDetail.controller";
import { OrderDetailRepository } from "./orderDetail.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "./orderDetail.entity";
import { Orders } from "../orders/orders.entity";
import { Products } from "../Products/product.entity";

@Module({
    imports:[TypeOrmModule.forFeature([OrderDetails, Orders, Products])],
    providers:[OrderDetailService, OrderDetailRepository],
    controllers:[OrderDetailController]
})
export class OrderDetailModule{}