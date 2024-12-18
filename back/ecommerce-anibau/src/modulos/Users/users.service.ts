import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './user.entity';
import { CreateUserDto } from './User.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  
  //* GET/USERS 
  async getUsers():Promise<Users[]>{
    return await this.userRepository.getUser();
  }
  //* GET/USERS/:ID
  async getUserbyId(id: string) {
    // const users = this.userRepository.getUser();
    // const user: Users = (await users).find((user) => user.id === id);
    // if (!user) {
    //   throw new Error(`User ${id} no encontrado`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword;
    return this.userRepository.getUserbyId(id)
  
  }
  //* PUT/USERS/:ID
  async updateUser(id: string, data: CreateUserDto) {
    // const users: Users[] = await this.userRepository.getUser();
    // const user: Users = users.find((user) => user.id === id);
    // if (!user) {
    //   throw new Error(`usuario ${id} no encontrado`);
    // }
    // const { prop, dato } = data;
    // if (!(prop in user)) {
    //   throw new Error(`la propiedad ${prop} no existe`);
    // }
    // user[prop] = dato;
    // return `ùsuario ${id} actualizado exitosamente`;
    return this.userRepository.updateUser(id, data)
  }
  //* DELETE/USERS/:ID
  async deleteUser(id: string) {
    // const users: Users[] = await this.userRepository.getUser();
    // const user: Users[] = users.filter((user) => user.id !== id);
    // this.userRepository.setUsers(user);
    // return `ùsuario ${id} eliminado exitosamente`;
    return this.userRepository.deleteUser(id)
  }
  //! solicitud GET con QUERY PARAMS Y PAGINACION
  async getUserbyQueryParams(page: number, limit: number) {
    return this.userRepository.getUserbyQueries(page, limit);
  }
}
