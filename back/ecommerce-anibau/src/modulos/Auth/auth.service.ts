import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { Users } from '../Users/users.entity';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
  getAuth() {
    return 'get Auths';
  }
  async getLogin(data: { email: string; password: string }) {
    const users: Users[] = await this.usersRepository.getUser();
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (!user) {
      throw new Error('Email o password incorrectos');
    }
    return user;
  }
}
