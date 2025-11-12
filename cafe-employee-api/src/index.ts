import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors"; // ✅ import cors
import { apiRouter } from "./api/routes/index.js";
import { errorHandler } from "./api/middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(express.json());

// ✅ Enable CORS before routes
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow multiple frontend ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Health check
app.get("/", (_req, res) => res.json({ ok: true, service: "cafe-employee-api" }));

// API routes
app.use("/api", apiRouter);

// Error handler
app.use(errorHandler);

const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));