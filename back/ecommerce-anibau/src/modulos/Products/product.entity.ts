import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { OrderDetails } from "../orderDetails/orderDetail.entity";

@Entity({name: 'products'})
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type:'varchar', length:50, nullable:false})
  name: string;
  @Column({type:'varchar', nullable:false})
  description: string;
  //price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
  @Column({type:'decimal', precision:10, scale:2, nullable:false})
  price: number;
  @Column({type:'int', nullable:false})
  stock: number;
  @Column({type:'varchar', default:'https://cdn-icons-png.flaticon.com/512/5115/5115607.png'})
  imgUrl: string;
  //category_id  (Relación 1:N).
  @ManyToOne(() => Categories, (category) => category.products, { nullable: false })
  category: Categories;
  //!Relación N:N con orderDetails.
  @ManyToMany(()=>OrderDetails, (orderDetail)=>orderDetail.products )
  orderDetails: OrderDetails[]
  }