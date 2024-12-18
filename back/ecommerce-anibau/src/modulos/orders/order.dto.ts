import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Products } from "../Products/product.entity"

export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true}) //valida que cada objeto del array sea evaluado
    @Type(()=>Products) //convierte cada objeto en una instancia de product antes de ser validado
    products: Partial<Products>[] //array de objetos parciales de la entidad product
}