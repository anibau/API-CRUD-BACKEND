import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

function ValidateRequest(request: Request): boolean {
  const authorization = request.headers['authorization'];
  return authorization?.trim() === 'Basic: <email>:<password>';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request){
      throw new UnauthorizedException('Request object is undefined')
    }
    if(!ValidateRequest(request)){
      throw new UnauthorizedException('authorization header is invalid')
    }
    return ValidateRequest(request);
  }
}
