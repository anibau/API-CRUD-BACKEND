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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../Auth/auth.guard");
const validateUser_1 = require("../../Utils/validateUser");
const CreateUserDto_1 = require("./CreateUserDto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsers() {
        try {
            return this.usersService.getUsers();
        }
        catch {
            throw new common_1.BadRequestException('Error al obtener los usuarios');
        }
    }
    getUserbyQuery(page = 1, limit = 5) {
        try {
            return this.usersService.getUserbyQueryParams(page, limit);
        }
        catch {
            throw new common_1.BadRequestException('Error al obtener el products por querys ');
        }
    }
    getUserbyId(id) {
        try {
            return this.usersService.getUserbyId(id);
        }
        catch {
            throw new common_1.BadRequestException(`Error al obtener el usuario por id ${id}`);
        }
    }
    createUser(user) {
        try {
            if ((0, validateUser_1.validateUser)(user)) {
                return this.usersService.createUser(user);
            }
            else {
                throw new common_1.NotFoundException(`datos incompletos para crear: ${user.name}`);
            }
        }
        catch {
            throw new common_1.BadRequestException('Error al crear usuario');
        }
    }
    updateUser(id, data) {
        try {
            if ((0, validateUser_1.validateUser)(data)) {
                return this.usersService.updateUser(id, data);
            }
            else {
                throw new common_1.NotFoundException(`datos incompletos para actualizar de ${data.name}`);
            }
        }
        catch {
            throw new common_1.BadRequestException(`Error al actualizar el usuario por id ${id}`);
        }
    }
    deleteUser(id) {
        try {
            return this.usersService.deleteUser(id);
        }
        catch {
            throw new common_1.BadRequestException(`Error al eliminar el usuario por id ${id}`);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserbyQuery", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserbyId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateUserDto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map