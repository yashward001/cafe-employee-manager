"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCafe = exports.updateCafe = exports.createCafe = void 0;
const prisma_js_1 = require("../../config/prisma.js");
const validators_js_1 = require("../../utils/validators.js");
const createCafe = async (input) => {
    const data = validators_js_1.createCafeSchema.parse(input);
    return prisma_js_1.prisma.cafe.create({ data });
};
exports.createCafe = createCafe;
const updateCafe = async (id, input) => {
    const data = validators_js_1.updateCafeSchema.parse(input);
    return prisma_js_1.prisma.cafe.update({ where: { id }, data });
};
exports.updateCafe = updateCafe;
// also delete all employees under the cafe (handled by cascade)
const deleteCafe = async (id) => {
    await prisma_js_1.prisma.cafe.delete({ where: { id } });
    return { deleted: true };
};
exports.deleteCafe = deleteCafe;
