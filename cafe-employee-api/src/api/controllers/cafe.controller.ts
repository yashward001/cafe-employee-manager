import { Request, Response } from "express";
import { listCafes } from "../../application/queries/cafe.queries.js";
import { createCafe, updateCafe, deleteCafe } from "../../application/commands/cafe.commands.js";

export const getCafes = async (req: Request, res: Response) => {
  const location = (req.query.location as string | undefined) || undefined;
  const result = await listCafes(location);
  res.json(result);
};

export const postCafe = async (req: Request, res: Response) => {
  const cafe = await createCafe(req.body);
  res.status(201).json(cafe);
};

export const putCafe = async (req: Request, res: Response) => {
  const cafe = await updateCafe(req.params.id, req.body);
  res.json(cafe);
};

export const removeCafe = async (req: Request, res: Response) => {
  const result = await deleteCafe(req.params.id);
  res.json(result);
};