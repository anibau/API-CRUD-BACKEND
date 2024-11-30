import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/auth.guard';
import { Users } from './user.entity';
import { validateUser } from 'src/Utils/validateUser';
import { CreateUserDto } from './CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUsers() {
    try{
      return this.usersService.getUsers();
    }catch{
      throw new BadRequestException('Error al obtener los usuarios')
    }
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyQuery(@Query('page') page: number= 1, @Query('limit') limit: number = 5) {
    try{
      return this.usersService.getUserbyQueryParams(page,limit);
    }catch{
      throw new BadRequestException('Error al obtener el products por querys ')
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyId(@Param('id', ParseUUIDPipe) id: string) {
    try{
      return this.usersService.getUserbyId(id);
    }catch{
      throw new BadRequestException(`Error al obtener el usuario por id ${id}`)
    }
  }
  @Post()
  @HttpCode(201)
  createUser(@Body() user:CreateUserDto): Promise<Users> {
    try{
      if(validateUser(user)){
        return this.usersService.createUser(user);
      } else {throw new NotFoundException(`datos incompletos para crear: ${user.name}`)}
    }catch{
      throw new BadRequestException('Error al crear usuario')
    }
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateUserDto,
  ) {
    try{
      if(validateUser(data)){
        return this.usersService.updateUser(id, data);
      } else{throw new NotFoundException(`datos incompletos para actualizar de ${data.name}`)}
    }catch{
      throw new BadRequestException(`Error al actualizar el usuario por id ${id}`)
    }
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try{
      return this.usersService.deleteUser(id);
    }catch{
      throw new BadRequestException(`Error al eliminar el usuario por id ${id}`)
    }
  }
}
