import { Injectable } from "@nestjs/common";
import { OrderDetailRepository } from "./orderDetail.repository";
import { OrderDetails } from "./orderDetail.entity";
import { OrderDetailDto } from "./orderDetail.dto";

@Injectable()
export class OrderDetailService{
    constructor(private readonly orderDetailRepository: OrderDetailRepository){}
    //* GET/ORDERDETAIL
    async getAll(){
        return this.orderDetailRepository.getAll()
    }
    //* GET/ORDERDETAIL/:ID
    async getbyId(id:string){
        return this.orderDetailRepository.getById(id)
    }
    //* POST/ORDERDETAIL
    async addDetail(data:OrderDetailDto):Promise<OrderDetails>{
        return this.orderDetailRepository.addOrderDetail(data)
    }
}