import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 400;
  res.status(status).json({
    error: err.message ?? "Unexpected error"
  });
};