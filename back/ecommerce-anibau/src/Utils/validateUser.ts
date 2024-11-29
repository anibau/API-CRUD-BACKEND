import { Users } from "src/modulos/Users/user.entity";

export function validateUser(data: Users):boolean{
    const validateU= 
    data.name !== undefined &&
    data.email !== undefined &&
    data.password!== undefined &&
    data.phone !== undefined &&
    data.address !== undefined &&
    data.country !== undefined &&
    data.city !== undefined;
    return validateU
}