"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = validateProduct;
function validateProduct(data) {
    const validateP = data.name !== undefined &&
        data.price !== undefined &&
        data.description !== undefined &&
        data.stock !== undefined &&
        data.categories !== undefined;
    return validateP;
}
//# sourceMappingURL=validateProduct.js.map