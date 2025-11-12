"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCafe = exports.putCafe = exports.postCafe = exports.getCafes = void 0;
const cafe_queries_js_1 = require("../../application/queries/cafe.queries.js");
const cafe_commands_js_1 = require("../../application/commands/cafe.commands.js");
const getCafes = async (req, res) => {
    const location = req.query.location || undefined;
    const result = await (0, cafe_queries_js_1.listCafes)(location);
    res.json(result);
};
exports.getCafes = getCafes;
const postCafe = async (req, res) => {
    const cafe = await (0, cafe_commands_js_1.createCafe)(req.body);
    res.status(201).json(cafe);
};
exports.postCafe = postCafe;
const putCafe = async (req, res) => {
    const cafe = await (0, cafe_commands_js_1.updateCafe)(req.params.id, req.body);
    res.json(cafe);
};
exports.putCafe = putCafe;
const removeCafe = async (req, res) => {
    const result = await (0, cafe_commands_js_1.deleteCafe)(req.params.id);
    res.json(result);
};
exports.removeCafe = removeCafe;
