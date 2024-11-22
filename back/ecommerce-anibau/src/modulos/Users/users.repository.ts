import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
  private Users: Users[] = [
    {
      id: 1,
      email: 'nina@mail.com',
      name: 'nina',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 2,
      email: 'shushi@mail.com',
      name: 'shushi',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 3,
      email: 'locky@mail.com',
      name: 'locky',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 4,
      email: 'manchas@mail.com',
      name: 'manchas',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
  ];
  async getUser() {
    return this.Users;
  }
  async setUsers(users) {
    this.Users = users;
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  async getUserbyQueries(page: number, limit: number) {
    const initialIndex = (page - 1) * limit;
    const lastIndex = initialIndex + limit;
    return this.Users.slice(initialIndex, lastIndex);
  }
}
