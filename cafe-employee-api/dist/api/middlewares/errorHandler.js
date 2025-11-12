"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 400;
    res.status(status).json({
        error: err.message ?? "Unexpected error"
    });
};
exports.errorHandler = errorHandler;
