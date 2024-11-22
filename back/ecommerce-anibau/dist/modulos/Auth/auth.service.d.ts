import { UsersRepository } from '../Users/users.repository';
import { Users } from '../Users/users.entity';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getAuth(): string;
    getLogin(data: {
        email: string;
        password: string;
    }): Promise<Users>;
}
