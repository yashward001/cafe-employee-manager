import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.employee.deleteMany();
  await prisma.cafe.deleteMany();

  const cafe1 = await prisma.cafe.create({
    data: {
      name: "Cafe Mocha",
      description: "Cozy corner cafe",
      location: "Orchard",
      logo: "https://picsum.photos/seed/mocha/100"
    }
  });

  const cafe2 = await prisma.cafe.create({
    data: {
      name: "Brew & Bite",
      description: "Modern coffee house",
      location: "Jurong",
      logo: "https://picsum.photos/seed/brew/100"
    }
  });

  const today = new Date();
  const start1 = new Date(today);
  start1.setDate(today.getDate() - 30);

  const start2 = new Date(today);
  start2.setDate(today.getDate() - 5);

  await prisma.employee.createMany({
    data: [
      {
        empCode: "UIX123456",
        name: "Alice Tan",
        email: "alice@example.com",
        phoneNumber: "91234567",
        gender: "Female",
        startDate: start1,
        cafeId: cafe1.id
      },
      {
        empCode: "UIX987654",
        name: "Ben Koh",
        email: "ben@example.com",
        phoneNumber: "81234567",
        gender: "Male",
        startDate: start2,
        cafeId: cafe1.id
      },
      {
        empCode: "UIX555555",
        name: "Cheryl Lim",
        email: "cheryl@example.com",
        phoneNumber: "98765432",
        gender: "Female",
        startDate: null,
        cafeId: null
      }
    ]
  });

  console.log("Seeded database with cafes and employees.");
}

main().finally(() => prisma.$disconnect());