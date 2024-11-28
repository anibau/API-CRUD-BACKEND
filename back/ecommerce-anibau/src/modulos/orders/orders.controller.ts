import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";

@Controller('orders')
export class OrdesController {
    constructor(private readonly orderService:OrdersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getOrderall(){
        return this.orderService.getOrderall()
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() data: Partial<Orders>, @Body() dataDetail: Partial<OrderDetails>){
        return this.orderService.addOrder(data, dataDetail)
    }

}