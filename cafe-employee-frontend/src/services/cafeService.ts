import { api } from "./api";
import type { Cafe, CafePayload } from "../types/cafe";

export const getCafes = async (location?: string): Promise<Cafe[]> => {
  const res = await api.get("/cafes", { params: { location } });
  return res.data;
};

export const createCafe = async (data: CafePayload): Promise<Cafe> => {
  const res = await api.post("/cafes", data);
  return res.data;
};

export const updateCafe = async (id: string, data: CafePayload): Promise<Cafe> => {
  const res = await api.put(`/cafes/${id}`, data);
  return res.data;
};

export const deleteCafe = async (id: string): Promise<{ ok: boolean }> => {
  const res = await api.delete(`/cafes/${id}`);
  return res.data;
};