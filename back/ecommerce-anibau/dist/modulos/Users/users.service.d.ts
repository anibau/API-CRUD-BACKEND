import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    getUsers(): Promise<Users[]>;
    getUserbyQueryParams(page: number, limit: number): Promise<Users[]>;
    getUserbyId(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
    }>;
    createUser(body: Omit<Users, 'id'>): Promise<{
        password: string;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
        id: number;
    }>;
    updateUser(id: number, data: {
        prop: string;
        dato: string;
    }): Promise<string>;
    deleteUser(id: number): Promise<string>;
}
