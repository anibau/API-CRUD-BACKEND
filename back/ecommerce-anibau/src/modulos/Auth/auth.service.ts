import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './LoginUserDto';
import { CreateUserDto } from '../Users/CreateUserDto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
private readonly jwtService: JwtService) {}

   async postSignup(user:CreateUserDto) {
    //verificar si el email ya existe, el password existe antes de crear el user
    const dbuser= await this.usersRepository.findOne({where:{email: user.email}});
    if(dbuser){
      throw new BadRequestException('Email already exist')
    } else if(!user.password || !user.confirmPassword){
      throw new BadRequestException('Data password incomplete')
    }else if(user.password!== user.confirmPassword){
      throw new BadRequestException('Data passwords do not match')
    }
    //crear contraseña hasheada
    const hashedPassword= await bcrypt.hash(user.password, 10);
    if(!hashedPassword){
      throw new BadRequestException('password could not be hashed')
    }
    //crear usuario
    const newUser=  this.usersRepository.create({...user, password: hashedPassword});
    await this.usersRepository.save(newUser);
    const {password, ...dataUser}= newUser;
    console.log(password);
    return dataUser
  }


  async getLogin(data:LoginUserDto) {
    const user:Users = await this.usersRepository.findOne({where:{email: data.email}});
    if(!user){
      throw new NotFoundException(`Invalidate credentials`)
    }
    const validPassword= await bcrypt.compare(data.password, user.password);
    if(!validPassword){
      throw new NotFoundException(`Invalidate credentials`)
    };
    //generar token
    const userPayload= {
      sub: user.id,
      id: user.id,
      email: user.email
    }
    const token=  this.jwtService.sign(userPayload);

    return {message:"User logged  in successfully", token,
      user}
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password,
    // );
    // if (!user) {
    //   throw new Error('Email o password incorrectos');
    // }
    // return user;
  }
}
