import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    userLogin(data: LoginUserDto): Promise<import("../Users/user.entity").Users>;
}
