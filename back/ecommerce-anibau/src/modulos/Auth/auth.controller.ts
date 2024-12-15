import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUserDto';
import { CreateUserDto } from '../Users/CreateUserDto';
import { validateUser } from '../../Utils/validateUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  postSignup(@Body() user: CreateUserDto) {
    try{
      if(validateUser(user)){
        return this.authService.postSignup(user)
      } else {throw new BadRequestException('datos incompletos')}
    }catch{
      throw new BadRequestException('Error al crear usuario')
    }
  }
  @Post('signin')
  @HttpCode(201)
  userLogin(@Body() data: LoginUserDto) {
    try{
      return this.authService.getLogin(data);
    }catch{
      throw new BadRequestException('Error al loguear')
    }
  }
}
