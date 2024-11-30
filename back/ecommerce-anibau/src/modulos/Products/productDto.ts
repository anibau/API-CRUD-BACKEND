import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ProductDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    stock: number

    @IsString()
    @IsOptional()
    imgUrl: string

    @IsString()
    @IsNotEmpty()
    categories: string
}