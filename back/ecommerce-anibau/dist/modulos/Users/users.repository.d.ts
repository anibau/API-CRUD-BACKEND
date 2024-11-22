import { Users } from './users.entity';
export declare class UsersRepository {
    private Users;
    getUser(): Promise<Users[]>;
    setUsers(users: any): Promise<void>;
    getUserbyQueries(page: number, limit: number): Promise<Users[]>;
}
