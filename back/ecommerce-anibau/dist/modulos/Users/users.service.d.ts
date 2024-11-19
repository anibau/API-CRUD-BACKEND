import { UsersRepository } from './users.repository';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    getUsers(): Promise<import("./users.entity").Users[]>;
}
