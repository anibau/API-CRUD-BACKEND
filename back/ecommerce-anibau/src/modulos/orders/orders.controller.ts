import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./CreateOrderDto";

@Controller('orders')
export class OrdesController {
    constructor(private readonly orderService:OrdersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getOrderall(){
        try{
            return this.orderService.getOrderall()
        }catch{
            throw new BadRequestException('Error al obtener las ordenes')
        }
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOrder(@Param('id', ParseUUIDPipe) id:string){
        try{
            return this.orderService.getOrder(id)
        }catch{
            throw new BadRequestException(`Error al obtener la orden por id ${id}`)
        }
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() data: CreateOrderDto){
        try{
            return this.orderService.addOrder(data)
        }catch{
            throw new BadRequestException(`Error al crear la orden`)
        }
    }

}