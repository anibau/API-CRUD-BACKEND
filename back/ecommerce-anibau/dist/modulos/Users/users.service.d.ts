import { UsersRepository } from './users.repository';
import { Users } from './user.entity';
import { CreateUserDto } from './CreateUserDto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    getUsers(): Promise<Users[]>;
    getUserbyId(id: string): Promise<{
        orders: {
            id: string;
            date: Date;
        }[];
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
    }>;
    updateUser(id: string, data: CreateUserDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
    getUserbyQueryParams(page: number, limit: number): Promise<Users[]>;
}
