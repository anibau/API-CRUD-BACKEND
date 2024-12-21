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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const data = require("../../Utils/data.json");
let ProductRepository = class ProductRepository {
    constructor(productRepository, categoriesRepository) {
        this.productRepository = productRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getProducts(page, limit) {
        const initialIndex = (page - 1) * limit;
        const lastIndex = initialIndex + limit;
        const products = await this.productRepository.find({ relations: { category: true } });
        if (!products) {
            throw new common_1.BadRequestException('no se encontraron productos');
        }
        return products.slice(initialIndex, lastIndex);
    }
    async addProductJSON() {
        for (const obj of data) {
            const product = await this.productRepository.findOne({ where: { name: obj.name } });
            if (!product) {
                let category = await this.categoriesRepository.findOne({ where: { name: obj.categories } });
                if (!category) {
                    category = this.categoriesRepository.create({ name: obj.categories });
                    await this.categoriesRepository.save(category);
                }
                const newProduct = this.productRepository.create({ ...obj, category });
                await this.productRepository.save(newProduct);
            }
            else {
                throw new common_1.BadRequestException(`The product ${obj.name} already exist`);
            }
        }
        ;
        return 'productos cargados';
    }
    async getProductbyId(id) {
        const product = await this.productRepository.findOne({
            where: { id: id }, relations: { category: true }
        });
        if (!product) {
            throw new common_1.NotFoundException(`error al obtener el producto por id ${id}`);
        }
        return product;
    }
    async createProduct(product) {
        const { categories: categName, ...restProduct } = product;
        if (!categName) {
            throw new common_1.NotFoundException('Debes especificar una "categories" para el producto.');
        }
        let category = await this.categoriesRepository.findOne({ where: { name: categName } });
        if (!category) {
            category = this.categoriesRepository.create({ name: categName });
            await this.categoriesRepository.save(category);
        }
        const nameproduct = await this.productRepository.findOne({ where: { name: restProduct.name } });
        if (nameproduct) {
            throw new common_1.NotFoundException(`el producto ${restProduct.name} ya existe`);
        }
        const newProduct = this.productRepository.create({ ...restProduct, category });
        if (!newProduct) {
            throw new common_1.BadRequestException('error al crear el producto');
        }
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    async updateProduct(id, data) {
        try {
            const product = await this.productRepository.findOne({ where: { id: id }, relations: { category: true } });
            if (!product) {
                throw new common_1.NotFoundException(`el producto ${id} no existe`);
            }
            ;
            const { categories: categName, ...restProduct } = data;
            if (categName) {
                let category = await this.categoriesRepository.findOne({ where: { name: categName } });
                if (!category) {
                    category = this.categoriesRepository.create({ name: categName });
                    await this.categoriesRepository.save(category);
                }
                ;
                product.category = category;
            }
            Object.assign(product, restProduct);
            await this.productRepository.save(product);
            return `producto con id ${id} actualizado exitosamente`;
        }
        catch (error) {
            throw new common_1.NotFoundException('error al actualizar ' + error);
        }
    }
    async deleteProduct(id) {
        const product = await this.productRepository.findOne({ where: { id: id } });
        if (!product) {
            throw new common_1.NotFoundException(`error: producto con id ${id} no encontrado`);
        }
        this.productRepository.remove(product);
        return `el producto con id ${id} fue eliminado exitosamente`;
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map