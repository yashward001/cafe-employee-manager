"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const index_js_1 = require("./api/routes/index.js");
const errorHandler_js_1 = require("./api/middlewares/errorHandler.js");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => res.json({ ok: true, service: "cafe-employee-api" }));
app.use("/api", index_js_1.apiRouter);
app.use(errorHandler_js_1.errorHandler);
const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, () => console.log(`API running on :${PORT}`));
