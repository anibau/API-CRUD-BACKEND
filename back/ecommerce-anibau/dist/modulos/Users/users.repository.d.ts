import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './User.dto';
export declare class UsersRepository {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    getUser(page?: number, limit?: number): Promise<Users[]>;
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
    updateUser(id: string, dataUser: CreateUserDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
