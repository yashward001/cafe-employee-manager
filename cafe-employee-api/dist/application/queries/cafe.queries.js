"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCafes = void 0;
const prisma_js_1 = require("../../config/prisma.js");
const listCafes = async (location) => {
    const where = location
        ? { location: { equals: location, mode: "insensitive" } }
        : {};
    const cafes = await prisma_js_1.prisma.cafe.findMany({
        where,
        include: { employees: true }
    });
    // sort by highest number of employees first
    cafes.sort((a, b) => b.employees.length - a.employees.length);
    return cafes.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        logo: c.logo ?? null,
        location: c.location,
        employees: c.employees.length
    }));
};
exports.listCafes = listCafes;
