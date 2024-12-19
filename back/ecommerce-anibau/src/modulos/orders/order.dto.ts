import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Products } from "../Products/product.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto{
    @ApiProperty({
        description:'Id de usuario en formato UUID',
        example:'"id":"20ede140-c53e-4b0b-858a-abc19cc6e514"'
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @ApiProperty({
        description:'Array de Ids de productos en formato UUID',
        example:'[{ "id":"60ede140-c53e-4b0b-858a-abc19cc6e514"}]'
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true}) //valida que cada objeto del array sea evaluado
    @Type(()=>Products) //convierte cada objeto en una instancia de product antes de ser validado
    products: Partial<Products>[] //array de objetos parciales de la entidad product
}