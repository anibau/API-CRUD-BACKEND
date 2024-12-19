import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "../Users/user.entity"
import { OrderDetails } from "../orderDetails/orderDetail.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: 'orders'})
export class Orders{
    @ApiProperty({
              description:'Id tipo UUID autogenerado',
    })
    @PrimaryGeneratedColumn('uuid') 
    id:string

    // user_id:  (Relación 1:N) con users .
    @ApiProperty({
        description:'Relacion de Users al que pertenece'
    })
    @ManyToOne(()=>Users, (user)=>user.orders)
    user: Users

    /**Fecha en la que fue generada la orden */
    @Column('date')
    date: Date

    /**Relacion  de OrderDetails */
    @OneToOne(()=>OrderDetails, (orderDetail)=> orderDetail.order, {cascade:true})
    @JoinColumn()
    orderDetails: OrderDetails;
}

//! Por ahora los usuarios solo pueden agregar una unidad de cada producto dentro de su carrito.