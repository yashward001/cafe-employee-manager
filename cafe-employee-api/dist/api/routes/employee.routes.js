"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = require("express");
const asyncHandler_js_1 = require("../middlewares/asyncHandler.js");
const employee_controller_js_1 = require("../controllers/employee.controller.js");
exports.employeeRouter = (0, express_1.Router)();
exports.employeeRouter.get("/", (0, asyncHandler_js_1.asyncHandler)(employee_controller_js_1.getEmployees)); // GET /employees?cafe=
exports.employeeRouter.post("/", (0, asyncHandler_js_1.asyncHandler)(employee_controller_js_1.postEmployee)); // POST /employees
exports.employeeRouter.put("/:id", (0, asyncHandler_js_1.asyncHandler)(employee_controller_js_1.putEmployee)); // PUT /employees/:id
exports.employeeRouter.delete("/:id", (0, asyncHandler_js_1.asyncHandler)(employee_controller_js_1.removeEmployee)); // DELETE /employees/:id
