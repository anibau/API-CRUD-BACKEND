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
exports.OrderDetailDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../Products/product.entity");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class OrderDetailDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { order: { required: true, type: () => String }, products: { required: true, type: () => [Object], minItems: 1 } };
    }
}
exports.OrderDetailDto = OrderDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de order en formato UUID',
        example: '"id":"20ede140-c53e-4b0b-858a-abc19cc6e514"'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de Ids de productos en formato UUID',
        example: '[{ "id":"60ede140-c53e-4b0b-858a-abc19cc6e514"}]'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => product_entity_1.Products),
    __metadata("design:type", Array)
], OrderDetailDto.prototype, "products", void 0);
//# sourceMappingURL=orderDetail.dto.js.map