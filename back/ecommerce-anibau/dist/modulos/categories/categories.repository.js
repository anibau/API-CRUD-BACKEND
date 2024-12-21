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
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("./categories.entity");
const typeorm_2 = require("typeorm");
const data = require("../../Utils/data.json");
let CategoriesRepository = class CategoriesRepository {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async getCategories() {
        const categories = await this.categoriesRepository.find({ relations: { products: true } });
        if (!categories.length) {
            throw new common_1.NotFoundException("No se encontraron categorías con productos asociados.");
        }
        return categories;
    }
    async addCategoryJSON() {
        for (const obj of data) {
            const category = await this.categoriesRepository.findOne({ where: { name: obj.categories } });
            if (!category) {
                const newCategory = this.categoriesRepository.create({ name: obj.categories });
                await this.categoriesRepository.save(newCategory);
            }
            else {
                throw new common_1.BadRequestException(`The category ${obj.categories} already exist`);
            }
        }
        ;
        return 'las categorias fueron agregadas';
    }
    async addCategories(categorie) {
        const searchCategory = await this.categoriesRepository.findOne({ where: { name: categorie.name } });
        if (searchCategory) {
            throw new common_1.NotFoundException(`Error: la categoria ${categorie.name} ya existe`);
        }
        const category = this.categoriesRepository.create(categorie);
        return this.categoriesRepository.save(category);
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map