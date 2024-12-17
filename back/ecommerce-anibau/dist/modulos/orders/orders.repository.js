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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("./orders.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../Users/user.entity");
const orderDetail_entity_1 = require("../orderDetails/orderDetail.entity");
const product_entity_1 = require("../Products/product.entity");
let OrderRepository = class OrderRepository {
    constructor(orderRepository, userRepository, orderDetailRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productRepository = productRepository;
    }
    async getOrderAll() {
        const orders = await this.orderRepository.find({ relations: { user: true, orderDetails: { products: true } } });
        if (!orders.length) {
            throw new common_1.NotFoundException('no se encontraron Ordenes con usuarios asociados');
        }
        ;
        return orders;
    }
    async getOrder(id) {
        const orders = await this.orderRepository.findOne({ where: { id: id }, relations: { user: true, orderDetails: { products: true } } });
        if (!orders) {
            throw new common_1.NotFoundException(`no se encontró la order con id ${id}`);
        }
        ;
        return orders;
    }
    async addOrder(data) {
        const user = await this.userRepository.findOne({ where: { id: data.userId }, select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'] });
        if (!user) {
            throw new common_1.NotFoundException(`usuario con id ${data.userId} no encontrado`);
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
        const orderDetail = this.orderDetailRepository.create({ price: priceTotal, products });
        await this.orderDetailRepository.save(orderDetail);
        const date = new Date();
        const newOrder = this.orderRepository.create({ ...data, date, user, orderDetails: orderDetail });
        await this.orderRepository.save(newOrder);
        return this.orderRepository.findOne({ where: { id: newOrder.id }, relations: { user: true, orderDetails: { products: true } } });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(orderDetail_entity_1.OrderDetails)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=orders.repository.js.map