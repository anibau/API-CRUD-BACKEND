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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUsers() {
        return this.userRepository.getUser();
    }
    async getUserbyQueryParams(page, limit) {
        return this.userRepository.getUserbyQueries(page, limit);
    }
    async getUserbyId(id) {
        const users = this.userRepository.getUser();
        const user = (await users).find((user) => user.id === id);
        if (!user) {
            throw new Error(`User ${id} no encontrado`);
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async createUser(body) {
        const users = await this.userRepository.getUser();
        const id = users.length + 1;
        users.push({ id, ...body });
        return { id, ...body };
    }
    async updateUser(id, data) {
        const users = await this.userRepository.getUser();
        const user = users.find((user) => user.id === id);
        if (!user) {
            throw new Error(`usuario ${id} no encontrado`);
        }
        const { prop, dato } = data;
        if (!(prop in user)) {
            throw new Error(`la propiedad ${prop} no existe`);
        }
        user[prop] = dato;
        return `ùsuario ${id} actualizado exitosamente`;
    }
    async deleteUser(id) {
        const users = await this.userRepository.getUser();
        const user = users.filter((user) => user.id !== id);
        this.userRepository.setUsers(user);
        return `ùsuario ${id} eliminado exitosamente`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map