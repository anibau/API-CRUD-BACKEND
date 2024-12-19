import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto{
     @ApiProperty({
            description:'El email debe ser el usado en el signup',
        })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description:'La contraseña debe ser la usada en el signup',
    })
    @IsNotEmpty()
    @IsString()
    password: string
}