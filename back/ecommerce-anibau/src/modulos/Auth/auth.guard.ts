import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //verificamos que el encabezado esta presente y sigue el formato bearer <token>
    const authHeader = request.headers['authorization'];
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('Authorization header is missing or malformed');
    // };
    const token = authHeader.split(' ')[1];
    if(!token){
      throw new UnauthorizedException('token not found')
    }
   try{
    const secret= process.env.JWT_SECRET;
    const payload= this.jwtService.verify(token, {secret});
    payload.iat= new Date(payload.iat *1000);
    payload.exp= new Date(payload.exp *1000);
    if(payload.isAdmin){
      payload.roles=['admin']
    }else{payload.roles=['user']}

    request.user=payload;
    console.log(request.user);
    return true
   }catch(error){
      throw new UnauthorizedException(`invalid token, ${error.message}`)
   }
  //return authorization?.trim() === 'Basic: <email>:<password>';
}}
