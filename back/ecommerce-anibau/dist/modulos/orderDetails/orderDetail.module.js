"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailModule = void 0;
const common_1 = require("@nestjs/common");
const orderDetail_service_1 = require("./orderDetail.service");
const orderDetail_controller_1 = require("./orderDetail.controller");
const orderDetail_repository_1 = require("./orderDetail.repository");
const typeorm_1 = require("@nestjs/typeorm");
const orderDetail_entity_1 = require("./orderDetail.entity");
const orders_entity_1 = require("../orders/orders.entity");
const product_entity_1 = require("../Products/product.entity");
let OrderDetailModule = class OrderDetailModule {
};
exports.OrderDetailModule = OrderDetailModule;
exports.OrderDetailModule = OrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orderDetail_entity_1.OrderDetails, orders_entity_1.Orders, product_entity_1.Products])],
        providers: [orderDetail_service_1.OrderDetailService, orderDetail_repository_1.OrderDetailRepository],
        controllers: [orderDetail_controller_1.OrderDetailController]
    })
], OrderDetailModule);
//# sourceMappingURL=orderDetail.module.js.map