import { UsersService } from './users.service';
import { Users } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<Users[]>;
    getUserbyQuery(page?: number, limit?: number): Promise<Users[]>;
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
    createUser(user: Users): Promise<Users>;
    updateUser(id: string, data: Users): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
