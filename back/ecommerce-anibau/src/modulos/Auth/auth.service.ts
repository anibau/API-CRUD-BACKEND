import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './LoginUser.dto';
import { CreateUserDto } from '../Users/User.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.decorator';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
private readonly jwtService: JwtService) {}

  //* POST/AUTH/SIGNUP
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, isAdmin, ...dataUser}= newUser;
    console.log(password);
    return dataUser
  }

  //* POST/AUTH/SIGNIN
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
      email: user.email,
      roles: [user.isAdmin? Role.Admin : Role.User]
    }
    const token=  this.jwtService.sign(userPayload);

    return {message:"User logged  in successfully", token}
    }
//! SCRIPT PARA CREACION DE ADMIN 
    async createAdminUser() {
      const existingAdmin = await this.usersRepository.findOne({ where: { isAdmin: true } });
      if (!existingAdmin) {
        const adminUser = new Users();
        adminUser.name = 'Default Admin';
        adminUser.email = process.env.ADMIN_EMAIL;
        adminUser.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        adminUser.address= 'calle admin 777';
        adminUser.city= 'peruadmin';
        adminUser.country='peruadmin';
        adminUser.phone= 124587;
        adminUser.isAdmin = true;
        await this.usersRepository.save(adminUser);
        console.log('Admin user created');
      }
    }
  }
  