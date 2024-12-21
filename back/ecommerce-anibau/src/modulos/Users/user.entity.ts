import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Orders } from "../orders/orders.entity"
import { ApiProperty } from "@nestjs/swagger"
@Entity({
    name: 'users'
})
export class Users {
    @ApiProperty({
        description:'Id tipo UUID autogenerado',
    })
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({
        description:'Nombre de Usuario',
    })
    @Column({type:'varchar', length:50, nullable:false})
    name: string

    @ApiProperty({
        description:'Email valido de usuario',
    })
    @Column({type:'varchar', length:50 ,unique:true, nullable:false})
    email: string

    @ApiProperty({
            description:'Contraseña encriptada tipo string',
        })
    @Column({type:'varchar', nullable:false}) // length:20
    password: string

    @ApiProperty({
        description:'Telefono valido de usuario',
    })
    @Column({type:'int'})
    phone: number

    @ApiProperty({
        description:'Pais de usuario',
    })
    @Column({type:'varchar', length:50})
    country: string

    @ApiProperty({
        description:'Direccion de usuario',
    })
    @Column({type:'varchar'})
    address: string

    @ApiProperty({
        description:'Ciudad de usuario',
    })
    @Column({type:'varchar', length:50})
    city: string

    // orders_id: Relación 1:N con orders.
    @ApiProperty({
        description:'Relacion de Orders del usuario',
    })
    @OneToMany(()=>Orders, (order)=>order.user, {cascade:true})
    orders: Orders[]

    @ApiProperty({
        description: 'Role de usuario por default "false"',
    })
    @Column({default: false})
    isAdmin: boolean
}