"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = void 0;
const prisma_js_1 = require("../../config/prisma.js");
const validators_js_1 = require("../../utils/validators.js");
// Helper to generate 'UIXXXXXXX' style emp code
function generateEmpCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let suffix = "";
    for (let i = 0; i < 7; i++) {
        suffix += letters[Math.floor(Math.random() * letters.length)];
    }
    return `UI${suffix}`;
}
// Ensure an employee is only in ONE cafe: our schema already enforces single cafeId.
// Commands below set/replace cafeId; there is no multi-assign path.
const createEmployee = async (input) => {
    const data = validators_js_1.createEmployeeSchema.parse(input);
    // prevent duplicate email
    const exists = await prisma_js_1.prisma.employee.findUnique({ where: { email: data.email } });
    if (exists)
        throw new Error("Employee already exists with this email");
    return prisma_js_1.prisma.employee.create({
        data: {
            empCode: generateEmpCode(),
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            startDate: data.startDate,
            cafeId: data.cafeId ?? null
        }
    });
};
exports.createEmployee = createEmployee;
const updateEmployee = async (id, input) => {
    const patch = validators_js_1.updateEmployeeSchema.parse(input);
    return prisma_js_1.prisma.employee.update({
        where: { id },
        data: {
            name: patch.name,
            email: patch.email,
            phoneNumber: patch.phoneNumber,
            gender: patch.gender,
            startDate: patch.startDate,
            cafeId: patch.cafeId ?? undefined
        }
    });
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (id) => {
    await prisma_js_1.prisma.employee.delete({ where: { id } });
    return { deleted: true };
};
exports.deleteEmployee = deleteEmployee;
