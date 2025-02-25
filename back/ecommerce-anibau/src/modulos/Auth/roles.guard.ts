import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext) {
        const requiredRoles= this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

        const request= context.switchToHttp().getRequest();
        const user= request.user;
        const hasRole= ()=>requiredRoles.some((role)=>user.roles.includes(role));
        const valid= user && user.roles && hasRole();
        if(!valid){
            throw new ForbiddenException('you do not have permission to access this route')
        };
        return valid
    }
}