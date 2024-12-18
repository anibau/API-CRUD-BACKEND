import { UsersService } from './users.service';
import { Users } from './user.entity';
import { CreateUserDto } from './User.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<Users[]>;
    getUserbyQuery(page?: number, limit?: number): Promise<Users[]>;
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
}
