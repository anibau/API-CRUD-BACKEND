import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @HttpCode(200)
  getAuth() {
    return this.authService.getAuth();
  }
  @Post('signin')
  @HttpCode(201)
  userLogin(@Body() data: { email: string; password: string }) {
    return this.authService.getLogin(data);
  }
}
