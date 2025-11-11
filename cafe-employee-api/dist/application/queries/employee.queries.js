"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEmployees = void 0;
const prisma_js_1 = require("../../config/prisma.js");
const date_js_1 = require("../../utils/date.js");
const listEmployees = async (cafeName) => {
    let where = {};
    if (cafeName) {
        const cafe = await prisma_js_1.prisma.cafe.findFirst({
            where: { name: { equals: cafeName, mode: "insensitive" } }
        });
        if (!cafe)
            return []; // invalid cafe -> empty list
        where.cafeId = cafe.id;
    }
    const employees = await prisma_js_1.prisma.employee.findMany({
        where,
        include: { cafe: true }
    });
    const enriched = employees.map(e => ({
        id: e.empCode,
        name: e.name,
        email_address: e.email,
        phone_number: e.phoneNumber,
        days_worked: (0, date_js_1.daysBetween)(e.startDate),
        cafe: e.cafe?.name ?? ""
    }));
    // Sort by highest days worked first
    enriched.sort((a, b) => b.days_worked - a.days_worked);
    return enriched;
};
exports.listEmployees = listEmployees;
