"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
function LoggerMiddleware(req, res, next) {
    console.log(`este es un middleware con la ruta ${req.url} y su metodo es ${req.method} y la fecha ${new Date()}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map