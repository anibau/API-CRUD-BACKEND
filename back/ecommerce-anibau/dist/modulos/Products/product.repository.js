"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
let ProductRepository = class ProductRepository {
    constructor() {
        this.Products = [
            {
                id: 1,
                name: 'camisa',
                description: 'ropa de hombre',
                price: 20,
                stock: true,
                imgUrl: 'string',
            },
            {
                id: 2,
                name: 'polo',
                description: 'ropa de hombre',
                price: 20,
                stock: true,
                imgUrl: 'string',
            },
            {
                id: 3,
                name: 'vestido',
                description: 'ropa de hombre',
                price: 20,
                stock: true,
                imgUrl: 'string',
            },
            {
                id: 4,
                name: 'short',
                description: 'ropa de hombre',
                price: 20,
                stock: true,
                imgUrl: 'string',
            },
        ];
    }
    async getProducts() {
        return this.Products;
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)()
], ProductRepository);
//# sourceMappingURL=product.repository.js.map