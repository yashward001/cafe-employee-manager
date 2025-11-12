"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const cafe_routes_js_1 = require("./cafe.routes.js");
const employee_routes_js_1 = require("./employee.routes.js");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use("/cafes", cafe_routes_js_1.cafeRouter);
exports.apiRouter.use("/employees", employee_routes_js_1.employeeRouter);
