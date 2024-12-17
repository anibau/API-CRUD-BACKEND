import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service";
import { OrderDetails } from "./orderDetail.entity";
import { OrderDetailDto } from "./orderDetail.dto";

@Controller('orderDetail')
export class OrderDetailController{
    constructor(private readonly orderDetailService: OrderDetailService){}

    //* GET/ORDERDETAIL
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(){
        try{
            return this.orderDetailService.getAll()
        }catch{
            throw new BadRequestException('Error al obtener los detalles de ordenes')
        }
    }
    //* GET/ORDERDETAIL/:ID
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getbyId(@Param('id', ParseUUIDPipe) id:string){
        try{
            return this.orderDetailService.getbyId(id)
        }catch{
            throw new BadRequestException(`Error al obtener el detalle de orden por id ${id}`)
        }
    }
    //* POST/ORDERDETAIL
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addDetail(@Body() data:OrderDetailDto):Promise<OrderDetails>{
        try{
            return this.orderDetailService.addDetail(data)
        }catch{
            throw new BadRequestException('Error al crear el detalle de orden')
        }
    }
}