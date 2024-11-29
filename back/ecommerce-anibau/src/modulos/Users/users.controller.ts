import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/auth.guard';
import { Users } from './user.entity';
import { validateUser } from 'src/Utils/validateUser';

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
  getUserbyQuery(@Query('page') page: number= 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUserbyQueryParams(page,limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserbyId(id);
  }
  @Post()
  @HttpCode(201)
  createUser(@Body() user:Users): Promise<Users> {
    if(validateUser(user)){
      return this.usersService.createUser(user);
    } else {throw new NotFoundException(`datos incompletos para crear: ${user.name}`)}
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(
    @Param('id') id: string,
    @Body() data: Users,
  ) {
    if(validateUser(data)){
      return this.usersService.updateUser(id, data);
    } else{throw new NotFoundException(`datos incompletos para actualizar de ${data.name}`)}
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
