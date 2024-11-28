import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "./orderDetail.entity";
import { Repository } from "typeorm";
import { Orders } from "../orders/orders.entity";

@Injectable()
export class OrderDetailRepository{
    constructor(@InjectRepository(OrderDetails) private orderDetailRepository: Repository<OrderDetails>,
@InjectRepository(Orders) private orderRepository: Repository<Orders>){}

    async getAll(){
        const OrdersD= await this.orderDetailRepository.find({relations:{order:true, products:true}});
        if(!OrdersD.length){
            throw new NotFoundException('no se encontraron "detalles de ordenes" ')
        }
        return OrdersD
    }
    async getById(id: string){
        const OrdersD= await this.orderDetailRepository.findOne({where:{id: id},relations:{order:true, products:true}});
        if(!OrdersD){
            throw new NotFoundException(`no se encontró el  "detalles de ordenes" con id ${id}`)
        }
        return OrdersD
    }
    async addOrderDetail(data: Partial<OrderDetails>){
        //encontrar la order 
        const order= await  this.orderRepository.findOne({where:{id: data.order as unknown as string}});
        if(!order){
            throw new NotFoundException(`order con id ${data.order} no encontrada`)
        }
        const newDetail= this.orderDetailRepository.create({...data, order}); //se vincula pasando la order
        return await this.orderDetailRepository.save(newDetail);
         
    }
}