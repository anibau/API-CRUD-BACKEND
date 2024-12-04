import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Orders } from "../orders/orders.entity"
@Entity({
    name: 'users'
})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({type:'varchar', length:50, nullable:false})
    name: string
    @Column({type:'varchar', length:50 ,unique:true, nullable:false})
    email: string
    @Column({type:'varchar', nullable:false}) //, length:20
    password: string
    @Column({type:'int'})
    phone: number
    @Column({type:'varchar', length:50})
    country: string
    @Column({type:'varchar'})
    address: string
    @Column({type:'varchar', length:50})
    city: string
    //! orders_id: Relación 1:N con orders.
    @OneToMany(()=>Orders, (order)=>order.user, {cascade:true})
    orders: Orders[]
}