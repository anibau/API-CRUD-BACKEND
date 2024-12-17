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
exports.OrderDetailRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderDetail_entity_1 = require("./orderDetail.entity");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("../orders/orders.entity");
const product_entity_1 = require("../Products/product.entity");
let OrderDetailRepository = class OrderDetailRepository {
    constructor(orderDetailRepository, orderRepository, productRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }
    async getAll() {
        const OrdersD = await this.orderDetailRepository.find({ relations: { order: true, products: true } });
        if (!OrdersD.length) {
            throw new common_1.NotFoundException('no se encontraron "detalles de ordenes" ');
        }
        return OrdersD;
    }
    async getById(id) {
        const OrdersD = await this.orderDetailRepository.findOne({ where: { id: id }, relations: { order: true, products: true } });
        if (!OrdersD) {
            throw new common_1.NotFoundException(`no se encontró el  "detalles de ordenes" con id ${id}`);
        }
        return OrdersD;
    }
    async addOrderDetail(data) {
        const order = await this.orderRepository.findOne({ where: { id: data.order } });
        if (!order) {
            throw new common_1.NotFoundException(`order con id ${data.order} no encontrada`);
        }
        const productsId = data.products.map((product) => product.id);
        const products = await Promise.all(productsId.map(async (productId) => {
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product || product.stock <= 0) {
                throw new common_1.NotFoundException(`El producto con ID ${productId} no está disponible o no tiene stock.`);
            }
            ;
            return product;
        }));
        let priceTotal = 0;
        for (const product of products) {
            priceTotal += parseFloat(product.price.toString());
            product.stock -= 1;
            await this.productRepository.save(product);
        }
        const newDetail = this.orderDetailRepository.create({ price: priceTotal, products, order });
        return await this.orderDetailRepository.save(newDetail);
    }
};
exports.OrderDetailRepository = OrderDetailRepository;
exports.OrderDetailRepository = OrderDetailRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderDetail_entity_1.OrderDetails)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderDetailRepository);
//# sourceMappingURL=orderDetail.repository.js.map