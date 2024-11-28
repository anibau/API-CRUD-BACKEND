import { UsersRepository } from './users.repository';
import { Users } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    getUsers(): Promise<Users[]>;
    getUserbyId(id: string): Promise<{
        ordenes: {
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
    createUser(body: Partial<Users>): Promise<Users>;
    updateUser(id: string, data: Partial<Users>): Promise<string>;
    deleteUser(id: string): Promise<string>;
    getUserbyQueryParams(page: number, limit: number): Promise<Users[]>;
}
