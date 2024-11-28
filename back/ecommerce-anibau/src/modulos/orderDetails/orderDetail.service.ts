import { Injectable } from "@nestjs/common";
import { OrderDetailRepository } from "./orderDetail.repository";
import { OrderDetails } from "./orderDetail.entity";

@Injectable()
export class OrderDetailService{
    constructor(private readonly orderDetailRepository: OrderDetailRepository){}

    async getAll(){
        return this.orderDetailRepository.getAll()
    }
    async getbyId(id:string){
        return this.orderDetailRepository.getById(id)
    }
    async addDetail(data: Partial<OrderDetails>){
        return this.orderDetailRepository.addOrderDetail(data)
    }
}