import { prisma } from "../../config/prisma.js";
import { daysBetween } from "../../utils/date.js";

export const listEmployees = async (cafeName?: string) => {
  let where: any = {};
  if (cafeName) {
    const cafe = await prisma.cafe.findFirst({
      where: { name: { equals: cafeName, mode: "insensitive" } }
    });
    if (!cafe) return []; // invalid cafe -> empty list
    where.cafeId = cafe.id;
  }

  const employees = await prisma.employee.findMany({
    where,
    include: { cafe: true }
  });

const enriched = employees.map(e => ({
  id: e.id,                      // ✅ real UUID (used for delete/update)
  empCode: e.empCode,            // ✅ for display only
  name: e.name,
  email_address: e.email,
  phone_number: e.phoneNumber,
  days_worked: daysBetween(e.startDate),
  cafe: e.cafe?.name ?? ""
}));

  // Sort by highest days worked first
  enriched.sort((a, b) => b.days_worked - a.days_worked);
  return enriched;
};