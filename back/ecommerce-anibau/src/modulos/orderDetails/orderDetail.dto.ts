import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Products } from "../Products/product.entity"
import { Type } from "class-transformer"

export class OrderDetailDto {
    @IsNotEmpty()
    @IsUUID()
    order: string

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>Products)
    products: Partial<Products>[]
}