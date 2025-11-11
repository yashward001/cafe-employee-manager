import { Router } from "express";
import { cafeRouter } from "./cafe.routes.js";
import { employeeRouter } from "./employee.routes.js";

export const apiRouter = Router();

apiRouter.use("/cafes", cafeRouter);
apiRouter.use("/employees", employeeRouter);