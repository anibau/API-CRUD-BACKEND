import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUsers() {
    return this.usersService.getUsers();
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyQuery(@Query() page: string = '2', limit: string = '5') {
    return this.usersService.getUserbyQueryParams(Number(page), Number(limit));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserbyId(Number(id));
  }
  @Post()
  @HttpCode(201)
  createUser(@Body() user: Omit<Users, 'id'>) {
    return this.usersService.createUser(user);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(
    @Param('id') id: string,
    @Body() data: { prop: string; dato: string },
  ) {
    return this.usersService.updateUser(Number(id), data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
