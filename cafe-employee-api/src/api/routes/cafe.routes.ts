import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getCafes, postCafe, putCafe, removeCafe } from "../controllers/cafe.controller.js";

export const cafeRouter = Router();

cafeRouter.get("/", asyncHandler(getCafes));          // GET /cafes?location=
cafeRouter.post("/", asyncHandler(postCafe));         // POST /cafes
cafeRouter.put("/:id", asyncHandler(putCafe));        // PUT /cafes/:id
cafeRouter.delete("/:id", asyncHandler(removeCafe));  // DELETE /cafes/:id