import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUser.dto';
import { CreateUserDto } from '../Users/User.dto';
import { validateUser } from '../../Utils/validateUser';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* POST/AUTH/SIGNUP
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
  //* POST/AUTH/SIGNIN
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
