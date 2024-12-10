import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUserDto';
import { CreateUserDto } from '../Users/CreateUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    postSignup(user: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../orders/orders.entity").Orders[];
        isAdmin: boolean;
    }>;
    userLogin(data: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
