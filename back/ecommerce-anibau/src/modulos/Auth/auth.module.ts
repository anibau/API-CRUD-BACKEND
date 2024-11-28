import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../Users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../Users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [AuthService, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
