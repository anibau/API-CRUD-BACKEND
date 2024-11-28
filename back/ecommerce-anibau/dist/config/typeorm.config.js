"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const categories_entity_1 = require("../modulos/categories/categories.entity");
const orderDetail_entity_1 = require("../modulos/orderDetails/orderDetail.entity");
const orders_entity_1 = require("../modulos/orders/orders.entity");
const product_entity_1 = require("../modulos/Products/product.entity");
const user_entity_1 = require("../modulos/Users/user.entity");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    entities: [user_entity_1.Users, product_entity_1.Products, categories_entity_1.Categories, orders_entity_1.Orders, orderDetail_entity_1.OrderDetails],
    synchronize: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.config.js.map