"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cafeRouter = void 0;
const express_1 = require("express");
const asyncHandler_js_1 = require("../middlewares/asyncHandler.js");
const cafe_controller_js_1 = require("../controllers/cafe.controller.js");
exports.cafeRouter = (0, express_1.Router)();
exports.cafeRouter.get("/", (0, asyncHandler_js_1.asyncHandler)(cafe_controller_js_1.getCafes)); // GET /cafes?location=
exports.cafeRouter.post("/", (0, asyncHandler_js_1.asyncHandler)(cafe_controller_js_1.postCafe)); // POST /cafes
exports.cafeRouter.put("/:id", (0, asyncHandler_js_1.asyncHandler)(cafe_controller_js_1.putCafe)); // PUT /cafes/:id
exports.cafeRouter.delete("/:id", (0, asyncHandler_js_1.asyncHandler)(cafe_controller_js_1.removeCafe)); // DELETE /cafes/:id
