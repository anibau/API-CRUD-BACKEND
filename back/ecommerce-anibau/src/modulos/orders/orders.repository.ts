/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "../Users/user.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
import { Products } from "../Products/product.entity";
import { CreateOrderDto } from "./order.dto";

@Injectable()
export class OrderRepository{
    constructor(@InjectRepository(Orders) private orderRepository: Repository<Orders>,
@InjectRepository(Users) private userRepository: Repository<Users>,
@InjectRepository(OrderDetails) private orderDetailRepository: Repository<OrderDetails>,
@InjectRepository(Products) private productRepository: Repository<Products>){}

    //* extra: GET/ORDERS
    async getOrderAll(){
        const orders= await this.orderRepository.find({relations:{ orderDetails:{products:true}}});
        if(!orders.length){
           throw new NotFoundException('no se encontraron Ordenes con usuarios asociados')
        };
        return orders
   }
    //* GET/ORDERS/:ID
   async getOrder(id:string){

    const orders= await this.orderRepository.findOne({where:{id: id},relations:{orderDetails:{products:true}}});
    if(!orders){
       throw new NotFoundException(`no se encontró la order con id ${id}`)
    };
       return orders
    }
    //* POST/ORDERS
    async addOrder(data:CreateOrderDto){
        //1. busca el uuario por  id
        const user= await this.userRepository.findOne({where:{id:data.userId as unknown as string}, select:['id', 'name', 'email', 'phone', 'country', 'address', 'city']});
        if(!user){
            throw new NotFoundException(`usuario con id ${data.userId} no encontrado`)
        }
        //2.- buscamos los productos y verificamos que haya stock
        const productsId= data.products.map((product)=>product.id);

        const products= await Promise.all(
            productsId.map(async(productId)=>{
                const product= await this.productRepository.findOne({where:{id: productId}});
                if(!product || product.stock<=0){
                    throw new NotFoundException(`El producto con ID ${productId} no está disponible o no tiene stock.`)
                };
                return product
            })
        )
       // 3. Reducir el stock de los productos y calcular el precio total
        let priceTotal= 0;
        for(const product of products){
            priceTotal+= parseFloat(product.price.toString());
            product.stock-=1;
            await this.productRepository.save(product)
        }
        
        // 5. Crear el detalle de la orden
        const orderDetail=  this.orderDetailRepository.create({price:priceTotal, products});
        await this.orderDetailRepository.save(orderDetail);
        
        //4. creamos la fecha
        const date= new Date();
        // 6. Crear la orden
        const newOrder=  this.orderRepository.create({...data, date, user ,orderDetails: orderDetail});
        await this.orderRepository.save(newOrder);
        // 7. Retornar la orden con los detalles y productos
        return this.orderRepository.findOne({where: {id: newOrder.id}, relations:{orderDetails:{products:true}}});
    }
}