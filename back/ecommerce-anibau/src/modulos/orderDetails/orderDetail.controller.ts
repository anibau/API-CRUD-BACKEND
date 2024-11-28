import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service";
import { OrderDetails } from "./orderDetail.entity";

@Controller('orderDetail')
export class OrderDetailController{
    constructor(private readonly orderDetailService: OrderDetailService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(){
        //return 'endpoint orderdetail'
       return this.orderDetailService.getAll()
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getbyId(@Param('id') id:string){
        return this.orderDetailService.getbyId(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addDetail(@Body() data: Partial<OrderDetails>){
        return this.orderDetailService.addDetail(data)
    }
}