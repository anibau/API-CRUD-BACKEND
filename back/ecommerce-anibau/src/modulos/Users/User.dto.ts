import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength, ValidateIf } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        description:'Nombre completo de usuario',
        example: 'Fabiana Gomez'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @ApiProperty({
        description:'El email debe ser valido',
        example: 'example@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description:'La contraseña debe tener entre 8-15 cararcteres y ser fuerte',
        example:'Example%123'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
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
    
    @ApiProperty({
        description:'La confirmacion y contraseña deben coincidir',
        example:'Example%123'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @MinLength(8)
    @ValidateIf(o => o.confirmPassword !== undefined)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
    'password must match the required format',
    })
    confirmPassword: string

    @ApiProperty({
        description:'Direccion de domicilio de usuario',
        example:'Av. los heroes 152'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @ApiProperty({
        description:'Numero telefónico de contacto'
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    phone: number

    /**Pais de origen de usuario entre 5-20 caracteres
     * @example Peruana 
     */
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country:string

    @ApiProperty({
        description: 'Ciudad de usuario entre 5-20 caracteres',
        example:'Cusco'
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string

    @ApiProperty({
        description:'Asignada por default al crear el usuario, no debe ser incluido en el body',
        default:false
    })
    @IsEmpty()
    isAdmin: boolean
}