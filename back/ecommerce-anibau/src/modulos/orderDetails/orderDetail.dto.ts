import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Products } from "../Products/product.entity"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class OrderDetailDto {
    @ApiProperty({
        description:'Id de order en formato UUID',
        example:'"id":"20ede140-c53e-4b0b-858a-abc19cc6e514"'
    })
    @IsNotEmpty()
    @IsUUID()
    order: string

    @ApiProperty({
            description:'Array de Ids de productos en formato UUID',
            example:'[{ "id":"60ede140-c53e-4b0b-858a-abc19cc6e514"}]'
        })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>Products)
    products: Partial<Products>[]
}