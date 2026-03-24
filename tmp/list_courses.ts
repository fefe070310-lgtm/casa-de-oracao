import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function list() {
  const courses = await prisma.course.findMany({
    select: { id: true, title: true }
  });
  console.log(JSON.stringify(courses, null, 2));
}

list().finally(() => prisma.$disconnect());
