"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
function validateUser(data) {
    const validateU = data.name !== undefined &&
        data.email !== undefined &&
        data.password !== undefined &&
        data.phone !== undefined &&
        data.address !== undefined &&
        data.country !== undefined &&
        data.city !== undefined;
    return validateU;
}
//# sourceMappingURL=validateUser.js.map