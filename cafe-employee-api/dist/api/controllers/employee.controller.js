"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmployee = exports.putEmployee = exports.postEmployee = exports.getEmployees = void 0;
const employee_queries_js_1 = require("../../application/queries/employee.queries.js");
const employee_commands_js_1 = require("../../application/commands/employee.commands.js");
const getEmployees = async (req, res) => {
    const cafe = req.query.cafe || undefined;
    const result = await (0, employee_queries_js_1.listEmployees)(cafe);
    res.json(result);
};
exports.getEmployees = getEmployees;
const postEmployee = async (req, res) => {
    const emp = await (0, employee_commands_js_1.createEmployee)(req.body);
    res.status(201).json(emp);
};
exports.postEmployee = postEmployee;
const putEmployee = async (req, res) => {
    const emp = await (0, employee_commands_js_1.updateEmployee)(req.params.id, req.body);
    res.json(emp);
};
exports.putEmployee = putEmployee;
const removeEmployee = async (req, res) => {
    const result = await (0, employee_commands_js_1.deleteEmployee)(req.params.id);
    res.json(result);
};
exports.removeEmployee = removeEmployee;
