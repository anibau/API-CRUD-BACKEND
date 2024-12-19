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
exports.Users = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("../orders/orders.entity");
const swagger_1 = require("@nestjs/swagger");
let Users = class Users {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String }, address: { required: true, type: () => String }, city: { required: true, type: () => String }, orders: { required: true, type: () => [require("../orders/orders.entity").Orders] }, isAdmin: { required: true, type: () => Boolean } };
    }
};
exports.Users = Users;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id tipo UUID autogenerado',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de Usuario',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email valido de usuario',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña encriptada tipo string',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefono valido de usuario',
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pais de usuario',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Direccion de usuario',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ciudad de usuario',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relacion de Orders del usuario',
    }),
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, (order) => order.user, { cascade: true }),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role de usuario por default "false"',
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users'
    })
], Users);
//# sourceMappingURL=user.entity.js.map