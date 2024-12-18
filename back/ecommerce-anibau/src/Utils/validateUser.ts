import { CreateUserDto } from "src/modulos/Users/User.dto";

export function validateUser(data:CreateUserDto):boolean{
    const validateU= 
    data.name !== undefined &&
    data.email !== undefined &&
    data.password!== undefined &&
    data.confirmPassword!==undefined&&
    data.phone !== undefined &&
    data.address !== undefined &&
    data.country !== undefined &&
    data.city !== undefined;
    return validateU
}