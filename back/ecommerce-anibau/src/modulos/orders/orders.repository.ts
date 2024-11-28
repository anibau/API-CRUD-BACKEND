import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "../Users/user.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
import { Products } from "../Products/product.entity";

@Injectable()
export class OrderRepository{
    constructor(@InjectRepository(Orders) private orderRepository: Repository<Orders>,
@InjectRepository(Users) private userRepository: Repository<Users>,
@InjectRepository(OrderDetails) private orderDetailRepository: Repository<OrderDetails>,
@InjectRepository(Products) private productRepository: Repository<Products>){}

    
    async getOrderAll(){
        const orders= await this.orderRepository.find({relations:{ user: true, orderDetails:true}});
        if(!orders.length){
           throw new NotFoundException('no se encontraron Ordenes con usuarios asociados')
        };
        return orders
   }
   async getOrder(id:string){

    const orders= await this.orderRepository.findOne({where:{id: id},relations:{ user: true, orderDetails:{products:true}}});
    if(!orders){
       throw new NotFoundException(`no se encontró la order con id ${id}`)
    };
    return orders
}
    async addOrder(data: Partial<Orders>, dataDetail: Partial<OrderDetails>){
        //1. busca el uuario por  id
        const user= await this.userRepository.findOne({where:{id:data.user as unknown as string}});
        if(!user){
            throw new NotFoundException(`usuario con id ${data.user} no encontrado`)
        }
        //2.- buscamos los productos y verificamos que haya stock
        const productsId= dataDetail.products as unknown as string[];
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
       // 4. Crear el detalle de la orden
        const orderDetail=  this.orderDetailRepository.create({...dataDetail, price:priceTotal, products});
        await this.orderDetailRepository.save(orderDetail);
        // 5. Crear la orden
        const newOrder=  this.orderRepository.create({...data, user ,orderDetails: orderDetail});
        await this.orderRepository.save(newOrder);
        // 6. Retornar la orden con los detalles y productos
        return this.orderRepository.findOne({where: {id: newOrder.id}, relations:{user:true, orderDetails:{products:true}}});
    }
}