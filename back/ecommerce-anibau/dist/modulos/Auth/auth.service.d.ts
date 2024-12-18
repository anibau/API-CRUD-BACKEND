import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './LoginUser.dto';
import { CreateUserDto } from '../Users/User.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    postSignup(user: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../orders/orders.entity").Orders[];
    }>;
    getLogin(data: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    createAdminUser(): Promise<void>;
}
