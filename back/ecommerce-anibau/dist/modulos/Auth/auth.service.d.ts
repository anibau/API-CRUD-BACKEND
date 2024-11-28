import { Users } from '../Users/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    getAuth(): string;
    getLogin(data: {
        email: string;
        password: string;
    }): Promise<Users>;
}
