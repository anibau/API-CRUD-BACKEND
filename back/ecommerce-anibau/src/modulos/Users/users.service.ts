import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  getUsers() {
    return this.userRepository.getUser();
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  async getUserbyQueryParams(page: number, limit: number) {
    return this.userRepository.getUserbyQueries(page, limit);
  }

  async getUserbyId(id: number) {
    const users = this.userRepository.getUser();
    const user: Users = (await users).find((user) => user.id === id);
    if (!user) {
      throw new Error(`User ${id} no encontrado`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async createUser(body: Omit<Users, 'id'>) {
    const users: Users[] = await this.userRepository.getUser();
    const id = users.length + 1;
    users.push({ id, ...body });
    return { id, ...body };
  }
  async updateUser(id: number, data: { prop: string; dato: string }) {
    const users: Users[] = await this.userRepository.getUser();
    const user: Users = users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`usuario ${id} no encontrado`);
    }
    const { prop, dato } = data;
    if (!(prop in user)) {
      throw new Error(`la propiedad ${prop} no existe`);
    }
    user[prop] = dato;
    return `ùsuario ${id} actualizado exitosamente`;
  }
  async deleteUser(id: number) {
    const users: Users[] = await this.userRepository.getUser();
    const user: Users[] = users.filter((user) => user.id !== id);
    this.userRepository.setUsers(user);
    return `ùsuario ${id} eliminado exitosamente`;
  }
}
