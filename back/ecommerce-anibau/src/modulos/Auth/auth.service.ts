import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
  getAuth() {
    return 'get Auths';
  }
  async getLogin(data: { email: string; password: string }) {
    const user:Users = await this.usersRepository.findOne({where:{email: data.email, password:data.password }});
    if(!user){
      throw new NotFoundException(`Email o password incorrectos`)
    }
    return user
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password,
    // );
    // if (!user) {
    //   throw new Error('Email o password incorrectos');
    // }
    // return user;
  }
}
