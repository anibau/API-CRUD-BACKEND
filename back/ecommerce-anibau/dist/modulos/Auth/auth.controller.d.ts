import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    userLogin(data: {
        email: string;
        password: string;
    }): Promise<import("../Users/users.entity").Users>;
}
