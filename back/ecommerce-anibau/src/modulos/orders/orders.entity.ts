import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "../Users/user.entity"
import { OrderDetails } from "../orderDetails/orderDetail.entity"

@Entity({name: 'orders'})
export class Orders{
    @PrimaryGeneratedColumn('uuid') 
    id:string
    //! user_id:  (Relación 1:N) con users PREGUNTAR.
    @ManyToOne(()=>Users, (user)=>user.orders)
    user: Users
    @Column('date')
    date: Date
    //Relación 1:1 con orderDetails.
    @OneToOne(()=>OrderDetails, (orderDetail)=> orderDetail.order, {cascade:true})
    @JoinColumn()
    orderDetails: OrderDetails;
}

//! Por ahora los usuarios solo pueden agregar una unidad de cada producto dentro de su carrito.