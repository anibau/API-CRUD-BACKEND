import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './LoginUserDto';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    getAuth(): string;
    getLogin(data: LoginUserDto): Promise<Users>;
}
