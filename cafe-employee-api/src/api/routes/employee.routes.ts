import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getEmployees, postEmployee, putEmployee, removeEmployee } from "../controllers/employee.controller.js";

export const employeeRouter = Router();

employeeRouter.get("/", asyncHandler(getEmployees));          // GET /employees?cafe=
employeeRouter.post("/", asyncHandler(postEmployee));         // POST /employees
employeeRouter.put("/:id", asyncHandler(putEmployee));        // PUT /employees/:id
employeeRouter.delete("/:id", asyncHandler(removeEmployee));  // DELETE /employees/:id