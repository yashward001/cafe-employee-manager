import { Request, Response } from "express";
import { listEmployees } from "../../application/queries/employee.queries.js";
import { createEmployee, updateEmployee, deleteEmployee } from "../../application/commands/employee.commands.js";

export const getEmployees = async (req: Request, res: Response) => {
  const cafe = (req.query.cafe as string | undefined) || undefined;
  const result = await listEmployees(cafe);
  res.json(result);
};

export const postEmployee = async (req: Request, res: Response) => {
  const emp = await createEmployee(req.body);
  res.status(201).json(emp);
};

export const putEmployee = async (req: Request, res: Response) => {
  const emp = await updateEmployee(req.params.id, req.body);
  res.json(emp);
};

export const removeEmployee = async (req: Request, res: Response) => {
  const result = await deleteEmployee(req.params.id);
  res.json(result);
};