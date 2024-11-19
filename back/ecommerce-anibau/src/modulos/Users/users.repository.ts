import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
  private Users: Users[] = [
    {
      id: 1,
      email: 'uno@mail.com',
      name: 'nina',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 2,
      email: 'uno@mail.com',
      name: 'shushi',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 3,
      email: 'uno@mail.com',
      name: 'locky',
      password: 'nina2000',
      address: 'calle falsa 123',
      phone: 'string',
      country: undefined,
      city: 'lima',
    },
    {
      id: 4,
      email: 'uno@mail.com',
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
}
