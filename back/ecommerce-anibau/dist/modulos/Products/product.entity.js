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
exports.Products = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const orderDetail_entity_1 = require("../orderDetails/orderDetail.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let Products = class Products {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number, description: "price: un n\u00FAmero decimal con una precisi\u00F3n de 10 d\u00EDgitos y una escala de 2 d\u00EDgitos. No puede ser nulo." }, stock: { required: true, type: () => Number }, imgUrl: { required: true, type: () => String }, category: { required: true, type: () => require("../categories/categories.entity").Categories }, orderDetails: { required: true, type: () => [require("../orderDetails/orderDetail.entity").OrderDetails] } };
    }
};
exports.Products = Products;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id tipo UUID autogenerado',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de Producto',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripcion del producto'
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad disponible del producto',
    }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL valida de imagen del producto, es opcional',
        default: 'https://cdn-icons-png.flaticon.com/512/5115/5115607.png'
    }),
    (0, typeorm_1.Column)({ type: 'varchar', default: 'https://cdn-icons-png.flaticon.com/512/5115/5115607.png' }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relacion de Category a la que pertenece'
    }),
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.products, { nullable: false }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relacion de OrderDetails en la que se encuentra'
    }),
    (0, typeorm_1.ManyToMany)(() => orderDetail_entity_1.OrderDetails, (orderDetail) => orderDetail.products),
    __metadata("design:type", Array)
], Products.prototype, "orderDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Products);
//# sourceMappingURL=product.entity.js.map