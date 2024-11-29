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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UsersRepository = class UsersRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser() {
        const users = await this.userRepository.find({ relations: { orders: true } });
        if (!users.length) {
            throw new common_1.NotFoundException('no se encontraron usuarios');
        }
        return users;
    }
    async getUserbyId(id) {
        const user = await this.userRepository.findOne({ where: { id: id }, relations: { orders: true } });
        if (!user) {
            throw new common_1.NotFoundException(`el usuario con id ${id} no existe`);
        }
        const { password, orders, ...restUser } = user;
        const ordenes = user.orders.map((order) => ({
            id: order.id,
            date: order.date
        }));
        return { ...restUser, ordenes };
    }
    async createUser(user) {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
    async updateUser(id, dataUser) {
        const user = await this.userRepository.findOne({ where: { id: id }, relations: { orders: true } });
        if (!user) {
            throw new common_1.NotFoundException(`usuario con id ${id} no encontrado`);
        }
        Object.assign(user, dataUser);
        await this.userRepository.save(user);
        return `usuario con id ${id} actualizado correctamente`;
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new common_1.NotFoundException(`ucuario con id ${id} no encontrado`);
        }
        await this.userRepository.remove(user);
        return `el usuario con id ${id} fue eliminado exitosamente`;
    }
    async getUserbyQueries(page = 1, limit = 5) {
        const initialIndex = (page - 1) * limit;
        const lastIndex = initialIndex + limit;
        const users = await this.userRepository.find();
        return users.slice(initialIndex, lastIndex);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map