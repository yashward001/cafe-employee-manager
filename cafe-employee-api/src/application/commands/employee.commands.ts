import { prisma } from "../../config/prisma.js";
import { createEmployeeSchema, updateEmployeeSchema } from "../../utils/validators.js";

// Helper to generate 'UIXXXXXXX' style emp code
function generateEmpCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 7; i++) {
    suffix += letters[Math.floor(Math.random() * letters.length)];
  }
  return `UI${suffix}`;
}

// Ensure an employee is only in ONE cafe: our schema already enforces single cafeId.
// Commands below set/replace cafeId; there is no multi-assign path.

export const createEmployee = async (input: unknown) => {
  const data = createEmployeeSchema.parse(input);

  // prevent duplicate email
  const exists = await prisma.employee.findUnique({ where: { email: data.email } });
  if (exists) throw new Error("Employee already exists with this email");

  return prisma.employee.create({
    data: {
      empCode: generateEmpCode(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      startDate: data.startDate,
      cafeId: data.cafeId ?? null
    }
  });
};

export const updateEmployee = async (id: string, input: unknown) => {
  const patch = updateEmployeeSchema.parse(input);
  return prisma.employee.update({
    where: { id },
    data: {
      name: patch.name,
      email: patch.email,
      phoneNumber: patch.phoneNumber,
      gender: patch.gender,
      startDate: patch.startDate,
      cafeId: patch.cafeId ?? undefined
    }
  });
};

export const deleteEmployee = async (id: string) => {
  await prisma.employee.delete({ where: { id } });
  return { deleted: true };
};