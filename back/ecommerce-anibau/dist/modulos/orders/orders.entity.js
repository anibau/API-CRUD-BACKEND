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
exports.Orders = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../Users/user.entity");
const orderDetail_entity_1 = require("../orderDetails/orderDetail.entity");
const swagger_1 = require("@nestjs/swagger");
let Orders = class Orders {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, user: { required: true, type: () => require("../Users/user.entity").Users }, date: { required: true, type: () => Date, description: "Fecha en la que fue generada la orden" }, orderDetails: { required: true, type: () => require("../orderDetails/orderDetail.entity").OrderDetails, description: "Relacion  de OrderDetails" } };
    }
};
exports.Orders = Orders;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id tipo UUID autogenerado',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Orders.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relacion de Users al que pertenece'
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.orders),
    __metadata("design:type", user_entity_1.Users)
], Orders.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Orders.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderDetail_entity_1.OrderDetails, (orderDetail) => orderDetail.order, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orderDetail_entity_1.OrderDetails)
], Orders.prototype, "orderDetails", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Orders);
//# sourceMappingURL=orders.entity.js.map