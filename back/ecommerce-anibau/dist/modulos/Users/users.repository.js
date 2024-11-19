"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
let UsersRepository = class UsersRepository {
    constructor() {
        this.Users = [
            {
                id: 1,
                email: 'uno@mail.com',
                name: 'nina',
                password: 'nina2000',
                address: 'calle falsa 123',
                phone: 'string',
                country: undefined,
                city: 'lima',
            },
            {
                id: 2,
                email: 'uno@mail.com',
                name: 'shushi',
                password: 'nina2000',
                address: 'calle falsa 123',
                phone: 'string',
                country: undefined,
                city: 'lima',
            },
            {
                id: 3,
                email: 'uno@mail.com',
                name: 'locky',
                password: 'nina2000',
                address: 'calle falsa 123',
                phone: 'string',
                country: undefined,
                city: 'lima',
            },
            {
                id: 4,
                email: 'uno@mail.com',
                name: 'manchas',
                password: 'nina2000',
                address: 'calle falsa 123',
                phone: 'string',
                country: undefined,
                city: 'lima',
            },
        ];
    }
    async getUser() {
        return this.Users;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)()
], UsersRepository);
//# sourceMappingURL=users.repository.js.map