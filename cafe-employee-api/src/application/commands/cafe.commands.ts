import { prisma } from "../../config/prisma.js";
import { z } from "zod";
import { createCafeSchema, updateCafeSchema } from "../../utils/validators.js";

export const createCafe = async (input: unknown) => {
  const data = createCafeSchema.parse(input);
  return prisma.cafe.create({ data });
};

export const updateCafe = async (id: string, input: unknown) => {
  const data = updateCafeSchema.parse(input);
  return prisma.cafe.update({ where: { id }, data });
};

// also delete all employees under the cafe (handled by cascade)
export const deleteCafe = async (id: string) => {
  await prisma.cafe.delete({ where: { id } });
  return { deleted: true };
};