import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";
import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Products{
    @ApiProperty({
          description:'Id tipo UUID autogenerado',
      })
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @ApiProperty({
      description:'Nombre de Producto',
    })
    @Column({type:'varchar', length:50, nullable:false})
    name: string;

    @ApiProperty({
      description:'Descripcion del producto'
    })
    @Column({type:'varchar', nullable:false})
    description: string;

    /**price: un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
    */
    @Column({type:'decimal', precision:10, scale:2, nullable:false})
    price: number;

    @ApiProperty({
      description:'Cantidad disponible del producto',
    })
    @Column({type:'int', nullable:false})
    stock: number;

    @ApiProperty({
      description:'URL valida de imagen del producto, es opcional',
      default: 'https://cdn-icons-png.flaticon.com/512/5115/5115607.png'
    })
    @Column({type:'varchar', default:'https://cdn-icons-png.flaticon.com/512/5115/5115607.png'})
    imgUrl: string;

    //category_id  (Relación 1:N).
    @ApiProperty({
      description:'Relacion de Category a la que pertenece'
    })
    @ManyToOne(() => Categories, (category) => category.products, { nullable: false })
    category: Categories;

    //Relación N:N con orderDetails.
    @ApiProperty({
      description:'Relacion de OrderDetails en la que se encuentra'
    })
    @ManyToMany(()=>OrderDetails, (orderDetail)=>orderDetail.products )
    orderDetails: OrderDetails[]
  }