import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "../Products/product.entity"

@Entity({name: 'categories'})
export class Categories {
    /**Id de formato UUID autogenerado */
    @PrimaryGeneratedColumn('uuid')
    id:string
    /**Nombre de categoria  */
    @Column({type:'varchar', length:50, nullable:false})
    name: string
    /**  Relación: N:1 con products.*/
    @OneToMany(()=>Products, (product)=>product.category, {cascade:true})
    products: Products[];
}
