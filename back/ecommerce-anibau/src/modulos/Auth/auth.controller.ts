import { BadRequestException, Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @HttpCode(200)
  getAuth() {
    try{
      return this.authService.getAuth();
    }catch{
      throw new BadRequestException()
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
