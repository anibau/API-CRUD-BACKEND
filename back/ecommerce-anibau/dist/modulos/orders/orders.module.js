"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const orders_repository_1 = require("./orders.repository");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("./orders.entity");
const orderDetail_entity_1 = require("../orderDetails/orderDetail.entity");
const user_entity_1 = require("../Users/user.entity");
const product_entity_1 = require("../Products/product.entity");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orders_entity_1.Orders, orderDetail_entity_1.OrderDetails, user_entity_1.Users, product_entity_1.Products])],
        providers: [orders_service_1.OrdersService, orders_repository_1.OrderRepository],
        controllers: [orders_controller_1.OrdesController]
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map