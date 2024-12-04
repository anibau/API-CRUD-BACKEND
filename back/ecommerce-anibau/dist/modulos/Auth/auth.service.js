"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../Users/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async postSignup(user) {
        const dbuser = await this.usersRepository.findOne({ where: { email: user.email } });
        if (dbuser) {
            throw new common_1.BadRequestException('Email already exist');
        }
        else if (!user.password || !user.confirmPassword) {
            throw new common_1.BadRequestException('Data password incomplete');
        }
        else if (user.password !== user.confirmPassword) {
            throw new common_1.BadRequestException('Data passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('password could not be hashed');
        }
        const newUser = this.usersRepository.create({ ...user, password: hashedPassword });
        await this.usersRepository.save(newUser);
        const { password, ...dataUser } = newUser;
        console.log(password);
        return dataUser;
    }
    async getLogin(data) {
        const user = await this.usersRepository.findOne({ where: { email: data.email } });
        if (!user) {
            throw new common_1.NotFoundException(`Invalidate credentials`);
        }
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            throw new common_1.NotFoundException(`Invalidate credentials`);
        }
        ;
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email
        };
        const token = this.jwtService.sign(userPayload);
        return { message: "User logged  in successfully", token,
            user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map