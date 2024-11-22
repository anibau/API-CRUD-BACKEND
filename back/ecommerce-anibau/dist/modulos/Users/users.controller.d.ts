import { UsersService } from './users.service';
import { Users } from './users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<Users[]>;
    getUserbyQuery(page?: string, limit?: string): Promise<Users[]>;
    getUserbyId(id: string): Promise<{
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
    }>;
    createUser(user: Omit<Users, 'id'>): Promise<{
        name: string;
        password: string;
        email: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
        id: number;
    }>;
    updateUser(id: string, data: {
        prop: string;
        dato: string;
    }): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
