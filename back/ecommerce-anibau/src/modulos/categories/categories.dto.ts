import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategorieDto{
    @ApiProperty({
            description:'Nombre de categoria',
        })
    @IsNotEmpty()
    @IsString()
    name: string
}