import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
    constructor(private readonly orderRepository: OrderRepository){}
    //* GET/ORDERS/:ID
    async getOrder(id:string){
        return this.orderRepository.getOrder(id);
    }
    //* GET/ORDERS
    async getOrderall(){
        return this.orderRepository.getOrderAll()
    }
    //* POST/ORDERS
    async addOrder(data){
        return this.orderRepository.addOrder(data);
    }
}