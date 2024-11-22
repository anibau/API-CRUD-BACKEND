import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

function ValidateRequest(request: Request): boolean {
  const authorization = request.headers['authorization'];
  return authorization?.trim() === 'Basic: <email>:<password>';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return ValidateRequest(request);
  }
}
