import { prisma } from "../../config/prisma.js";

export const listCafes = async (location?: string) => {
  const where = location
    ? { location: { equals: location, mode: "insensitive" as const } }
    : {};

  const cafes = await prisma.cafe.findMany({
    where,
    include: { employees: true }
  });

  // sort by highest number of employees first
  cafes.sort((a, b) => b.employees.length - a.employees.length);

  return cafes.map(c => ({
    id: c.id,
    name: c.name,
    description: c.description,
    logo: c.logo ?? null,
    location: c.location,
    employees: c.employees.length
  }));
};