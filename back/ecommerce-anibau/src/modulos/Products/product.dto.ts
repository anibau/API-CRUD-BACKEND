import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ProductDto{
    @ApiProperty({
        description:'Nombre unico del producto'
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description:'Descripcion detallada del producto'
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description:'Precio del producto: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos',
        example: 25.90
    })
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description:'Cantidad disponible del producto',
        example: 15
    })
    @IsNumber()
    @IsNotEmpty()
    stock: number

    @ApiProperty({
        description:'URL valida de imagen del producto, es opcional',
        default: 'https://cdn-icons-png.flaticon.com/512/5115/5115607.png'
    })
    @IsString()
    @IsOptional()
    imgUrl: string

    @ApiProperty({
        description:'Categoria a la que pertenece el producto'
    })
    @IsString()
    @IsNotEmpty()
    categories: string
}