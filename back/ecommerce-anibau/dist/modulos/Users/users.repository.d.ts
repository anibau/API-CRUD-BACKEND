import { Users } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersRepository {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    getUser(): Promise<Users[]>;
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
    createUser(user: Partial<Users>): Promise<Users>;
    updateUser(id: string, dataUser: any): Promise<string>;
    deleteUser(id: string): Promise<string>;
    getUserbyQueries(page: number, limit: number): Promise<Users[]>;
}
