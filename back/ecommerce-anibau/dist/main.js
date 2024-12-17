"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./modulos/Auth/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        exceptionFactory(errors) {
            const cleanErrors = errors.map(error => {
                return { property: error.property, constraints: error.constraints };
            });
            return new common_1.BadRequestException({
                alert: 'Se detectaron los siguientes errores:',
                errors: cleanErrors
            });
        },
    }));
    app.use(logger_middleware_1.LoggerMiddleware);
    const adminUserService = app.get(auth_service_1.AuthService);
    await adminUserService.createAdminUser();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map