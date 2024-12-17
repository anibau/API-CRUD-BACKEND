import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "./orderDetail.entity";
import { Repository } from "typeorm";
import { Orders } from "../orders/orders.entity";
import { Products } from "../Products/product.entity";
import { OrderDetailDto } from "./orderDetail.dto";

@Injectable()
export class OrderDetailRepository{
    constructor(@InjectRepository(OrderDetails) private orderDetailRepository: Repository<OrderDetails>,
@InjectRepository(Orders) private orderRepository: Repository<Orders>,
@InjectRepository(Products) private productRepository: Repository<Products>){}

    //* GET/ORDERDETAIL
    async getAll(){
        const OrdersD= await this.orderDetailRepository.find({relations:{order:true, products:true}});
        if(!OrdersD.length){
            throw new NotFoundException('no se encontraron "detalles de ordenes" ')
        }
        return OrdersD
    }
    //* GET/ORDERDETAIL/:ID
    async getById(id: string){
        const OrdersD= await this.orderDetailRepository.findOne({where:{id: id},relations:{order:true, products:true}});
        if(!OrdersD){
            throw new NotFoundException(`no se encontró el  "detalles de ordenes" con id ${id}`)
        }
        return OrdersD
    }
    //* POST/ORDERDETAIL
    async addOrderDetail(data:OrderDetailDto):Promise<OrderDetails>{
        //1.- encontrar la order 
        const order= await  this.orderRepository.findOne({where:{id: data.order as unknown as string}});
        if(!order){
            throw new NotFoundException(`order con id ${data.order} no encontrada`)
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
        const newDetail=  this.orderDetailRepository.create({price:priceTotal, products, order});
        return await this.orderDetailRepository.save(newDetail);
         
    }
}