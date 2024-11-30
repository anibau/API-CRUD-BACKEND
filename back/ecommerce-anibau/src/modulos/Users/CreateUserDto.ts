import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @MinLength(8)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message:
          'password must be 8-15 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
      })
    password: string

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country:string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string
}