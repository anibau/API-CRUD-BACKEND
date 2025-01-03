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
exports.OrderDetailController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orderDetail_service_1 = require("./orderDetail.service");
const orderDetail_dto_1 = require("./orderDetail.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderDetailController = class OrderDetailController {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async getAll() {
        try {
            return this.orderDetailService.getAll();
        }
        catch {
            throw new common_1.BadRequestException('Error al obtener los detalles de ordenes');
        }
    }
    async getbyId(id) {
        try {
            return this.orderDetailService.getbyId(id);
        }
        catch {
            throw new common_1.BadRequestException(`Error al obtener el detalle de orden por id ${id}`);
        }
    }
    async addDetail(data) {
        try {
            return this.orderDetailService.addDetail(data);
        }
        catch {
            throw new common_1.BadRequestException('Error al crear el detalle de orden');
        }
    }
};
exports.OrderDetailController = OrderDetailController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./orderDetail.entity").OrderDetails] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./orderDetail.entity").OrderDetails }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getbyId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./orderDetail.entity").OrderDetails }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orderDetail_dto_1.OrderDetailDto]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "addDetail", null);
exports.OrderDetailController = OrderDetailController = __decorate([
    (0, swagger_1.ApiTags)('OrderDetails'),
    (0, common_1.Controller)('orderDetail'),
    __metadata("design:paramtypes", [orderDetail_service_1.OrderDetailService])
], OrderDetailController);
//# sourceMappingURL=orderDetail.controller.js.map