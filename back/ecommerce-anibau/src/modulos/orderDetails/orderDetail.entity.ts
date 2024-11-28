import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Orders } from "../orders/orders.entity"
import { Products } from "../Products/product.entity"

@Entity({name:'orderdetails'})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id:string
    // price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 
    @Column({type: 'decimal', precision:10, scale:2, nullable:false})
    price: number
    //!order_id: Relación 1:1 con orders.
    @OneToOne(()=>Orders, (order)=>order.orderDetails)
    order: Orders;
    // Relación N:N con products.
    @ManyToMany(()=>Products , (product)=>product.orderDetails ,{cascade:true})
    @JoinTable()
    products: Products[] 
}