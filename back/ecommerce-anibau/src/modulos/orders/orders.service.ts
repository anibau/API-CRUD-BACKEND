import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
    constructor(private readonly orderRepository: OrderRepository){}

    async getOrder(id:string){
        return this.orderRepository.getOrder(id);
    }
    async getOrderall(){
        return this.orderRepository.getOrderAll()
    }
    async addOrder(data){
        return this.orderRepository.addOrder(data);
    }
}